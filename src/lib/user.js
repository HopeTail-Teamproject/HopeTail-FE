import axios from "axios";

export const getUserInfo = async () => {
  const res = await axios.get("/api/account/userinfo");
  return res.data.data;
};
