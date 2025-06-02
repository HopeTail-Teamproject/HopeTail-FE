const BASE_URL = process.env.VITE_API_BASE_URL || "";

export const uploadImageToServer = async (imageFile) => {
  const formData = new FormData();
  formData.append("file", imageFile);

  const user = JSON.parse(localStorage.getItem("user"));

  const res = await fetch(`${BASE_URL}/api/images/upload`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
    body: formData,
  });

  if (!res.ok) throw new Error("이미지 업로드 실패");

  const imageUrl = await res.text();
  return imageUrl;
};
