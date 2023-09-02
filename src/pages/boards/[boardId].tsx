import { GetServerSidePropsContext } from "next";
import React from "react";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { BoardContainer } from "@/components/board/BoardContainer";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import axios from "axios";

const Board = ({
  boardId,
  isLoggedIn,
  viewOnly,
}: {
  boardId: string;
  isLoggedIn: boolean;
  viewOnly: boolean;
}) => {
  return (
    <>
      <BoardContainer
        boardId={boardId}
        isLoggedIn={isLoggedIn}
        viewOnly={viewOnly}
      />
    </>
  );
};

export default Board;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await getServerSession(context.req, context.res, authOptions);
  const isLoggedIn = !!session;

  const { boardId, view } = context?.query;
  const queryClient = new QueryClient();
  const viewOnly = Boolean(view);

  try {
    await queryClient.fetchQuery(["GetBoardData", boardId], async () => {
      const data = await axios.get(
        `${process.env.BACKEND_URL || "http://localhost:5000"}` +
          `/api/board/${boardId}`
      );
      return data?.data;
    });
  } catch (error: any) {
    if (error?.response?.status === 404) {
      return {
        redirect: {
          destination: "/404",
          permanent: false,
        },
      };
    }
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      boardId,
      isLoggedIn,
      viewOnly,
    },
  };
};
