import { IBoard } from "@/interfaces/BoardInterface";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Skeleton,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React, { useState } from "react";
import { AddPost } from "./AddPost";
import { CardComponent } from "./CardComponent";
import { CheckPermission } from "../common/CheckPermission";
import { useRouter } from "next/router";
import ViewOnlyBoard from "./ViewOnlyBoard";
import { NavHeader } from "../common/NavHeader";
import { useGetBoardData } from "@/api/boardApi";
import EditIcon from "@mui/icons-material/Edit";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import SendIcon from "@mui/icons-material/Send";

interface Props {
  boardId: string;
  isLoggedIn: boolean;
}
export const BoardContainer: React.FC<Props> = ({ boardId, isLoggedIn }) => {
  const router = useRouter();
  const { view } = router.query;
  const viewOnly = view ?? null;
  const { data, isLoading: boardLoading } = useGetBoardData(boardId);
  const board: IBoard = data?.data;

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
            >
              <Grid
                container
                alignItems="center"
                justifyContent="center"
                height={205}
              >
                <Grid item xs={12}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-end",
                    }}
                  >
                    {boardLoading ? (
                      <Box mr={5}>
                        <Skeleton width={200} height={40} animation="wave" />
                      </Box>
                    ) : (
                      <>
                        {" "}
                        <Button color="info" variant="outlined">
                          <RemoveRedEyeIcon />
                        </Button>
                        <Box ml={1}>
                          <Button variant="outlined" color="info">
                            <EditIcon />
                          </Button>
                        </Box>
                        <Box ml={1} mr={5}>
                          <Button variant="outlined" color="info">
                            <SendIcon />
                          </Button>
                        </Box>
                      </>
                    )}
                  </Box>
                </Grid>

                <Grid item xs={12} sx={{ marginBottom: 2 }}>
                  {boardLoading ? (
                    <Box>
                      <Skeleton
                        width={300}
                        height={100}
                        sx={{ margin: "0 auto" }}
                        animation="wave"
                      />
                    </Box>
                  ) : (
                    <>
                      <Typography
                        color="#fff"
                        fontSize={{ xs: 30, sm: 36 }}
                        fontWeight={600}
                        textAlign="center"
                      >
                        {board?.displayName}
                      </Typography>
                    </>
                  )}
                </Grid>
                <Grid item xs={7}>
                  <CheckPermission
                    render={
                      <Button
                        sx={{
                          fontSize: 18,
                          borderRadius: 8,
                        }}
                        variant="contained"
                        onClick={() => setShowAddPost(true)}
                      >
                        <AddIcon sx={{ marginRight: 1 }} /> Add to Board
                      </Button>
                    }
                  />
                </Grid>
              </Grid>
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
