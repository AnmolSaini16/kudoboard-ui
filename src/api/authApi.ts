import { RegisterInterface, SingInInterface } from "@/interfaces/AuthInterface";
import { getData, postData } from "./commonAPI";
import { useQuery } from "@tanstack/react-query";

export const logIn = async ({ payload }: { payload: SingInInterface }) => {
  return await postData("/api/auth/login", payload);
};

export const logOut = async () => {
  return await postData("/api/auth/logout", {});
};

export const registerUser = async ({
  payload,
}: {
  payload: RegisterInterface;
}) => {
  return await postData("/api/auth/register", payload);
};

export const getCurrentUser = () => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : "";
  return useQuery(
    ["GetCurrentUser"],
    async () => await getData("/api/auth/getCurrentUser"),
    {
      staleTime: Infinity,
      refetchOnWindowFocus: false,
      enabled: !!token,
    }
  );
};
