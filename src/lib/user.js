import axios from "axios";

// 유저 정보 가져오기
export const getUserInfo = async () => {
  const token = localStorage.getItem("token");

  try {
    const res = await axios.get(`/api/account/userinfo`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("🔥 전체 응답:", res); // 응답 구조 확인

    if (res.data && res.data.data) {
      return res.data.data;
    } else {
      console.warn("⚠️ 응답 구조가 예상과 다릅니다:", res.data);
      return null;
    }
  } catch (err) {
    console.error("🚨 getUserInfo API 호출 실패:", err);
    return null;
  }
};

// 유저 정보 수정하기
export const updateUserInfo = async (updatedInfo) => {
  const token = localStorage.getItem("token");

  const { password, ...infoToSend } = updatedInfo;
  if (password && password.trim() !== "") {
    infoToSend.password = password;
  }

  const res = await axios.patch(`/api/account/userinfo`, infoToSend, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  return res.data;
};
