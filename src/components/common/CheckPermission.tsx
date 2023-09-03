import { AppContext, AppContextType } from "@/context/AppContext";
import { useRouter } from "next/router";
import React, { useContext, useMemo } from "react";

export const CheckPermission = ({
  render,
  checkAuth,
  boardId,
}: {
  render: JSX.Element;
  checkAuth?: boolean;
  boardId?: string;
}) => {
  const { userData } = useContext(AppContext) as AppContextType;
  const router = useRouter();
  const { view } = router.query;
  const viewOnly = Boolean(view);

  const userIsCreator = useMemo(() => {
    if (boardId && userData?.boardIds.length) {
      return userData.boardIds.includes(boardId);
    }
    return false;
  }, [userData, boardId]);

  const getComponent = () => {
    if (viewOnly && !checkAuth) return null;
    if (checkAuth) return userIsCreator ? render : null;

    return render;
  };
  return <>{getComponent()}</>;
};
