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

  useEffect(() => {
    const startAdoption = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`/api/adoption/start?petId=${id}`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("입양 신청을 시작할 수 없습니다.");
        }

        const adoptionId = await response.text();
        setAdoptionId(adoptionId);
      } catch (error) {
        console.error("입양 신청 시작 중 오류 발생:", error);
        // 에러 처리 로직 추가 필요
      }
    };

    startAdoption();
  }, [id]);

  const handleImageUpload = (imageUrls) => {
    setFormData((prev) => ({
      ...prev,
      images: imageUrls,
    }));
  };

  const handleAnswersSubmit = (answers, formType) => {
    setFormData((prev) => ({
      ...prev,
      [formType]: answers,
    }));
  };

  const handleFinalSubmit = async () => {
    if (!adoptionId) return;

    try {
      const token = localStorage.getItem("token");

      // 이미지 업로드
      if (formData.images.length > 0) {
        const imageResponse = await fetch(`/api/adoption/${adoptionId}/images`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData.images),
        });

        if (!imageResponse.ok) {
          throw new Error("이미지 업로드에 실패했습니다.");
        }
      }

      // 모든 답변 합치기
      const allAnswers = [
        ...formData.form2Answers,
        ...formData.form22Answers,
        ...formData.form3Answers,
      ];

      // 답변 저장
      const answersResponse = await fetch(`/api/adoption/${adoptionId}/answers`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(allAnswers),
      });

      if (!answersResponse.ok) {
        throw new Error("답변 저장에 실패했습니다.");
      }

      // 최종 제출
      const submitResponse = await fetch(`/api/adoption/${adoptionId}/submit`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!submitResponse.ok) {
        throw new Error("입양 신청 제출에 실패했습니다.");
      }

      window.location.href = "/";
    } catch (error) {
      console.error("입양 신청 제출 중 오류 발생:", error);
      alert(
        language === "kr"
          ? "입양 신청 제출 중 오류가 발생했습니다."
          : "An error occurred while submitting the adoption request."
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
    const response = await fetch(`/api/adoption/${adoptionId}/submit`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("입양 신청 제출에 실패했습니다.");
    }

    return redirect("/");
  } catch (error) {
    console.error("입양 신청 제출 중 오류 발생:", error);
    return redirect("/");
  }
}
