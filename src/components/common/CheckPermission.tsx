import { useRouter } from "next/router";
import React from "react";

export const CheckPermission = ({ render }: { render: JSX.Element }) => {
  const router = useRouter();
  const { view } = router.query;
  const viewOnly = view ?? null;
  return <>{!viewOnly ? <>{render}</> : <>{null}</>}</>;
};
