import { useGetBoardData } from "@/api/boardApi";
import { GetServerSidePropsContext } from "next";
import React from "react";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { BoardContainer } from "@/components/board/BoardContainer";
import { IBoard } from "@/interfaces/BoardInterface";
import { NavHeader } from "@/components/common/NavHeader";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import axios from "axios";

const Board = ({
  boardId,
  isLoggedIn,
}: {
  boardId: string;
  isLoggedIn: boolean;
}) => {
  const { data, isLoading: boardLoading } = useGetBoardData(boardId);
  const boardData: IBoard = data?.data;

  return (
    <>
      <NavHeader isLoggedIn={isLoggedIn} redirectUrl={`/boards/${boardId}`} />
      <BoardContainer board={boardData} boardLoading={boardLoading} />
    </>
  );
};

export default Board;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await getServerSession(context.req, context.res, authOptions);
  const isLoggedIn = !!session;

  const boardId = context?.query?.boardId;
  const queryClient = new QueryClient();

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
    },
  };
};
