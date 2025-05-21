import axios from "axios";

export const getPetDetail = async (id, token) => {
  const res = await axios.get(`/api/petposts/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const likePet = async (id, token) => {
  const res = await axios.post(`/api/petposts/${id}/like`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const getAllPets = async (token) => {
  const res = await axios.get(`/api/petposts`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

