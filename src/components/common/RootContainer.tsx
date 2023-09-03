import { getCurrentUser } from "@/api/authApi";
import { AppContext } from "@/context/AppContext";
import { IUser } from "@/interfaces/AuthInterface";
import { Box } from "@mui/material";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

export const RootContainer = ({ children }: { children: JSX.Element }) => {
  const { data: session } = useSession();
  const [userData, setUserData] = useState<IUser | null>(null);
  const { data, isLoading } = getCurrentUser(session);
  const currentUser = data?.data;

  useEffect(() => {
    if (currentUser && !currentUser?.error && !isLoading) {
      setUserData(currentUser);
    } else setUserData(null);
  }, [currentUser]);

  return (
    <Box sx={{ textDecoration: "none" }}>
      <AppContext.Provider value={{ userData, setUserData }}>
        {children}
      </AppContext.Provider>
    </Box>
  );
};
