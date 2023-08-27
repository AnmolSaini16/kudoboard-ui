import { IBoard } from "@/interfaces/BoardInterface";
import { Box, Button, Skeleton, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React, { useState } from "react";
import { AddPost } from "./AddPost";
import { CardComponent } from "./CardComponent";
import { CheckPermission } from "../common/CheckPermission";
import { useRouter } from "next/router";
import ViewOnlyBoard from "./ViewOnlyBoard";
import { NavHeader } from "../common/NavHeader";

interface Props {
  board: IBoard;
  boardLoading: boolean;
  boardId: string;
  isLoggedIn: boolean;
}
export const BoardContainer: React.FC<Props> = ({
  board,
  boardLoading,
  boardId,
  isLoggedIn,
}) => {
  const router = useRouter();
  const { view } = router.query;
  const viewOnly = view ?? null;
  const [addPost, setShowAddPost] = useState<boolean>(false);
  const [showViewOnlyIntro, setShowViewOnlyIntro] = useState<boolean>(
    !!viewOnly
  );

  return (
    <>
      <Box>
        {showViewOnlyIntro ? (
          <ViewOnlyBoard
            board={board}
            handleClose={() => setShowViewOnlyIntro(false)}
          />
        ) : (
          <>
            <NavHeader
              isLoggedIn={isLoggedIn}
              redirectUrl={`/boards/${boardId}`}
            />
            <Box
              boxShadow={4}
              sx={{
                height: 180,
                backgroundColor: "#90A4D4",
                borderBottomLeftRadius: 16,
                borderBottomRightRadius: 16,
                position: "relative",
              }}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              {boardLoading ? (
                <Skeleton width={300} height={100} animation="wave" />
              ) : (
                <>
                  <Typography
                    color="#fff"
                    fontSize={36}
                    fontWeight={600}
                    textAlign="center"
                  >
                    {board?.displayName}
                  </Typography>
                  <CheckPermission
                    render={
                      <Button
                        sx={{ position: "absolute", bottom: -16, fontSize: 20 }}
                        variant="contained"
                        onClick={() => setShowAddPost(true)}
                      >
                        <AddIcon sx={{ marginRight: 1 }} /> Add to Board
                      </Button>
                    }
                  />
                </>
              )}
            </Box>
            <Box
              sx={{
                backgroundImage: "url(../../board-bg.jpg)",
              }}
              minHeight={"calc(100vh - 250px)"}
            >
              <CardComponent board={board} boardLoading={boardLoading} />
            </Box>
          </>
        )}
      </Box>

      {addPost && (
        <AddPost
          open={addPost}
          handleClose={() => setShowAddPost(false)}
          boardId={board?.boardId}
        />
      )}
    </>
  );
};
