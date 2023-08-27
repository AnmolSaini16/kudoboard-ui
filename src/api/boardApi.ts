import { deleteData, getData, postData } from "./commonAPI";
import { useQuery } from "@tanstack/react-query";

export const createBoard = async ({
  payload,
}: {
  payload: {
    boardId: string;
    displayName: string;
    boardType: string;
    recipient: string;
    createdBy: string;
  };
}) => {
  return await postData("/api/board/createBoard", payload);
};

export const useGetBoardData = (boardId: string) => {
  return useQuery({
    queryKey: ["GetBoardData", boardId],
    queryFn: async () => await getData(`/api/board/${boardId}`),
  });
};

export const useGetAllBoards = (id: string) => {
  return useQuery(
    ["GetAllBoards", id],
    async () => await getData("/api/board"),
    {
      refetchOnWindowFocus: false,
    }
  );
};

export const deleteBoard = async ({ boardId }: { boardId: string }) => {
  return await deleteData("/api/board/deleteBoard", {
    boardId,
  });
};

export const addPost = async ({
  payload,
}: {
  payload: { msg: string; madeBy: string; boardId: string };
}) => {
  return await postData("/api/board/addCard", payload);
};

export const editPost = async ({
  payload,
}: {
  payload: { msg: string; madeBy: string; cardId: string; boardId: string };
}) => {
  return await postData("/api/board/editCard", payload);
};

export const deletePost = async ({
  payload,
}: {
  payload: { cardId: string; boardId: string };
}) => {
  return await deleteData("/api/board/deleteCard", payload);
};
