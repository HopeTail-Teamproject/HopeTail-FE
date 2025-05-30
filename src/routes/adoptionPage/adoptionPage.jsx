import MainAdoptPage from "../../components/adopt/MainAdoptPage";
import { redirect, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function AdoptionPage() {
  const { id } = useParams();
  const [adoptionId, setAdoptionId] = useState(null);
  const [formData, setFormData] = useState({
    images: [],
    form2Answers: [],
    form22Answers: [],
    form3Answers: [],
  });
  const [language, setLanguage] = useState("kr");

  useEffect(() => {
    const startAdoption = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `${process.env.VITE_API_BASE_URL}/api/adoption/start?petId=${id}`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          if (response.status === 500) {
            throw new Error("서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
          }
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.data?.errMsg || "입양 신청을 시작할 수 없습니다.");
        }

        const data = await response.json().catch(() => ({}));
        console.log("서버 응답:", data);
        const adoptionId = typeof data === "number" ? data : data.data;
        if (!adoptionId) {
          throw new Error("서버 응답이 올바르지 않습니다.");
        }
        setAdoptionId(adoptionId);
      } catch (error) {
        console.error("입양 신청 시작 중 오류 발생:", error);
        alert(error.message);
      }
    };

    startAdoption();
  }, [id]);

  const handleImageUpload = (imageFiles) => {
    setFormData((prev) => ({
      ...prev,
      images: imageFiles,
    }));
  };

  const handleAnswersSubmit = (answers, formType) => {
    setFormData((prev) => ({
      ...prev,
      [formType]: answers,
    }));
  };

  const handleFinalSubmit = async () => {
    if (!adoptionId) {
      alert(language === "kr" ? "입양 신청 ID가 없습니다." : "No adoption ID found.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert(language === "kr" ? "로그인이 필요합니다." : "Please log in.");
        return;
      }

      // 이미지 업로드
      if (formData.images.length > 0) {
        const formDataToSend = new FormData();
        formData.images.forEach((image, index) => {
          formDataToSend.append("images", image);
        });

        const imageResponse = await fetch(
          `${process.env.VITE_API_BASE_URL}/api/adoption/${adoptionId}/images`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formDataToSend,
          }
        );

        if (!imageResponse.ok) {
          const errorData = await imageResponse.json().catch(() => ({}));
          throw new Error(errorData.data?.errMsg || "이미지 업로드에 실패했습니다.");
        }
      }

      // 모든 답변 합치기
      const allAnswers = [
        ...formData.form2Answers,
        ...formData.form22Answers,
        ...formData.form3Answers,
      ];

      // 답변 저장
      const answersResponse = await fetch(
        `${process.env.VITE_API_BASE_URL}/api/adoption/${adoptionId}/answers`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(allAnswers),
        }
      );

      if (!answersResponse.ok) {
        const errorData = await answersResponse.json().catch(() => ({}));
        throw new Error(errorData.data?.errMsg || "답변 저장에 실패했습니다.");
      }

      // 최종 제출
      const submitResponse = await fetch(
        `${process.env.VITE_API_BASE_URL}/api/adoption/${adoptionId}/submit`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ petId: id }),
        }
      );

      if (!submitResponse.ok) {
        const errorData = await submitResponse.json().catch(() => ({}));
        throw new Error(errorData.data?.errMsg || "입양 신청 제출에 실패했습니다.");
      }

      alert(
        language === "kr"
          ? "입양 신청이 완료되었습니다."
          : "Adoption application completed."
      );
      window.location.href = "/HopeTail-FE/";
    } catch (error) {
      console.error("입양 신청 제출 중 오류 발생:", error);
      alert(
        error.message ||
          (language === "kr"
            ? "입양 신청 중 오류가 발생했습니다."
            : "An error occurred during adoption application.")
      );
    }
  };

  if (!adoptionId) {
    return <div>로딩 중...</div>;
  }

  return (
    <MainAdoptPage
      adoptionId={adoptionId}
      onImageUpload={handleImageUpload}
      onAnswersSubmit={handleAnswersSubmit}
      onFinalSubmit={handleFinalSubmit}
    />
  );
}

export default AdoptionPage;

export async function action({ request }) {
  const formData = await request.formData();
  const adoptionId = formData.get("adoptionId");
  const token = localStorage.getItem("token");

  if (!adoptionId) {
    throw new Error("입양 신청 ID가 없습니다.");
  }

  try {
    const response = await fetch(
      `${process.env.VITE_API_BASE_URL}/api/adoption/${adoptionId}/submit`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("입양 신청 제출에 실패했습니다.");
    }

    return redirect("/HopeTail-FE/");
  } catch (error) {
    console.error("입양 신청 제출 중 오류 발생:", error);
    return redirect("/HopeTail-FE/");
  }
}
