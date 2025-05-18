import MainAdoptPage from "../../components/adopt/MainAdoptPage";
import { redirect, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function AdoptionPage() {
  const { id } = useParams();
  const [adoptionId, setAdoptionId] = useState(null);

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

  const handleImageUpload = async (imageUrls) => {
    if (!adoptionId) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/adoption/${adoptionId}/images`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(imageUrls),
      });

      if (!response.ok) {
        throw new Error("이미지 업로드에 실패했습니다.");
      }

      // 응답이 비어있는 경우 처리
      const text = await response.text();
      if (!text) {
        console.log("이미지 업로드 성공 (응답 없음)");
        return;
      }

      // JSON 파싱 시도
      try {
        const result = JSON.parse(text);
        console.log("이미지 업로드 성공:", result);
      } catch (e) {
        console.log("이미지 업로드 성공 (응답:", text, ")");
      }
    } catch (error) {
      console.error("이미지 업로드 중 오류 발생:", error);
      // 에러 처리 로직 추가 필요
    }
  };

  const handleAnswersSubmit = async (answers) => {
    if (!adoptionId) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/adoption/${adoptionId}/answers`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(answers),
      });

      if (!response.ok) {
        throw new Error("답변 저장에 실패했습니다.");
      }

      // 응답이 비어있는 경우 처리
      const text = await response.text();
      if (!text) {
        console.log("답변 저장 성공 (응답 없음)");
        return;
      }

      // JSON 파싱 시도
      try {
        const result = JSON.parse(text);
        console.log("답변 저장 성공:", result);
      } catch (e) {
        console.log("답변 저장 성공 (응답:", text, ")");
      }
    } catch (error) {
      console.error("답변 저장 중 오류 발생:", error);
      // 에러 처리 로직 추가 필요
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

    // 응답이 비어있는 경우 처리
    const text = await response.text();
    if (!text) {
      console.log("입양 신청 제출 성공 (응답 없음)");
      return redirect("/");
    }

    // JSON 파싱 시도
    try {
      const result = JSON.parse(text);
      console.log("입양 신청 제출 성공:", result);
    } catch (e) {
      console.log("입양 신청 제출 성공 (응답:", text, ")");
    }

    return redirect("/");
  } catch (error) {
    console.error("입양 신청 제출 중 오류 발생:", error);
    // 에러 처리 로직 추가 필요
    return redirect("/");
  }
}
