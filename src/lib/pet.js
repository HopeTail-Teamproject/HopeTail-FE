const BASE_URL = process.env.VITE_API_BASE_URL || "";

export const getPetDetail = async (id, token) => {
  const res = await fetch(`${BASE_URL}/api/petposts/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("상세 조회 실패");
  return res.json();
};

export const likePet = async (id, token) => {
  const res = await fetch(`${BASE_URL}/api/petposts/${id}/like`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("좋아요 실패");
};

export const deletePet = async (id, token) => {
  const res = await fetch(`${BASE_URL}/api/petposts/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("삭제 실패");
};
