import { IBoard } from "@/interfaces/BoardInterface";
import { Box, Button, Skeleton, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React, { useState } from "react";
import { AddPost } from "./AddPost";
import { CardComponent } from "./CardComponent";
import { CheckPermission } from "../common/CheckPermission";

interface Props {
  board: IBoard;
  boardLoading: boolean;
}
export const BoardContainer: React.FC<Props> = ({ board, boardLoading }) => {
  const [addPost, setShowAddPost] = useState<boolean>(false);

  return (
    <>
      <Box>
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
