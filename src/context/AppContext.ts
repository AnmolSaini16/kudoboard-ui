import { IUser } from "@/interfaces/AuthInterface";
import React, { Dispatch, SetStateAction, createContext } from "react";

export interface AppContextType {
  userData: IUser | null;
  setUserData: Dispatch<SetStateAction<IUser | null>>;
}

export const AppContext = createContext<AppContextType | null>(null);
