import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";
axios.defaults.baseURL =
  process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000/";

export const getData = async (apiName: string) => {
  return await axios.get(apiName);
};

export const postData = async (apiName: string, payload: any) => {
  return await axios.post(apiName, payload);
};

export const deleteData = async (apiName: string, payload: any) => {
  return await axios.delete(apiName, { data: payload });
};
