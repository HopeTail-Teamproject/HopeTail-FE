import axios from "axios";

const BASE_URL = process.env.VITE_API_BASE_URL || "";

export const getPetDetail = async (id, token) => {
  const res = await axios.get(`${BASE_URL}/api/petposts/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const likePet = async (id, token) => {
  const res = await axios.post(`${BASE_URL}/api/petposts/${id}/like`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const getAllPets = async (token) => {
  const res = await axios.get(`${BASE_URL}/api/petposts`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  console.log("🧪 전체 응답:", res);
  console.log("🧪 res.data:", res.data);

  return res.data;
};
