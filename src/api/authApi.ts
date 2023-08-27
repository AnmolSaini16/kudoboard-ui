import { RegisterInterface } from "@/interfaces/AuthInterface";
import { getData, postData } from "./commonAPI";
import { useQuery } from "@tanstack/react-query";
import { Session } from "next-auth";

export const registerUser = async ({
  payload,
}: {
  payload: RegisterInterface;
}) => {
  return await postData("/api/auth/register", payload);
};

export const getCurrentUser = (session: Session | null) => {
  return useQuery(
    ["GetCurrentUser"],
    async () => await getData("/api/auth/getCurrentUser"),
    {
      staleTime: Infinity,
      refetchOnWindowFocus: false,
      enabled: !!session,
    }
  );
};
