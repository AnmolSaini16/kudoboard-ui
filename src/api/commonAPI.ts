import axios from "axios";
import { getSession } from "next-auth/react";

axios.defaults.baseURL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000/";

const getToken = async () => {
  const token = typeof window !== "undefined" && localStorage.getItem("token");
  if (token) return token;

  const session = await getSession();
  // @ts-ignore
  const authToken: string = session?.accessToken;
  localStorage.setItem("token", authToken);
  return authToken;
};

export const getData = async (apiName: string) => {
  const token = await getToken();
  return await axios.get(apiName, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const postData = async (apiName: string, payload: any) => {
  const token = await getToken();
  return await axios.post(apiName, payload, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const deleteData = async (apiName: string, payload: any) => {
  const token = await getToken();
  return await axios.delete(apiName, {
    data: payload,
    headers: { Authorization: `Bearer ${token}` },
  });
};
