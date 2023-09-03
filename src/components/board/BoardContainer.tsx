import { IBoard } from "@/interfaces/BoardInterface";
import {
  Box,
  Button,
  Grid,
  Skeleton,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React, { useEffect, useState } from "react";
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
import { CustomModel } from "../common/CustomModel";
import { useSnackbar } from "notistack";
import { EditBoardTitle } from "./EditBoardTitle";
import Confetti from "react-confetti";
import useWindowDimensions from "@/hooks/useWindowDimensions";
interface Props {
  boardId: string;
  isLoggedIn: boolean;
  viewOnly: boolean;
}
export const BoardContainer: React.FC<Props> = ({
  boardId,
  isLoggedIn,
  viewOnly,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const { width, height } = useWindowDimensions();
  const { data, isLoading: boardLoading } = useGetBoardData(boardId);
  const board: IBoard = data;
  const [addPost, setShowAddPost] = useState<boolean>(false);
  const [showViewOnlyIntro, setShowViewOnlyIntro] = useState<boolean>(viewOnly);
  const [editTitle, setEditTitle] = useState<boolean>(false);
  const [deliverBoard, setDilverBoard] = useState<boolean>(false);
  const [confettiRun, setConfettiRun] = useState(false);
  const shareLink = `${
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000/"
  }boards/${boardId}?view=true`;

  const handleShareClick = () => {
    navigator.clipboard.writeText(shareLink);
    enqueueSnackbar("Link copied", { variant: "success" });
  };

  useEffect(() => {
    setShowViewOnlyIntro(viewOnly);
  }, [viewOnly]);

  console.log(confettiRun);

  return (
    <>
      {confettiRun && (
        <Confetti
          width={width - 20}
          height={height}
          numberOfPieces={400}
          recycle={false}
          run={confettiRun}
          onConfettiComplete={() => setConfettiRun(false)}
        />
      )}

      <Box>
        {showViewOnlyIntro ? (
          <ViewOnlyBoard
            board={board}
            handleClose={() => {
              setShowViewOnlyIntro(false), setConfettiRun(true);
            }}
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
                        {
                          <CheckPermission
                            checkAuth
                            boardId={boardId}
                            render={
                              <>
                                {!viewOnly ? (
                                  <Tooltip title="View as recipient">
                                    <Button
                                      color="info"
                                      variant="outlined"
                                      onClick={() =>
                                        router.push(
                                          `/boards/${board.boardId}?view=true`
                                        )
                                      }
                                    >
                                      <RemoveRedEyeIcon />
                                    </Button>
                                  </Tooltip>
                                ) : (
                                  <Tooltip title="View as editor">
                                    <Button
                                      color="info"
                                      variant="outlined"
                                      onClick={() =>
                                        router.push(`/boards/${board.boardId}`)
                                      }
                                    >
                                      <RemoveRedEyeIcon />
                                    </Button>
                                  </Tooltip>
                                )}
                                <Box ml={1}>
                                  <Tooltip title="Edit board title">
                                    <Button
                                      variant="outlined"
                                      color="info"
                                      onClick={() => setEditTitle(true)}
                                    >
                                      <EditIcon />
                                    </Button>
                                  </Tooltip>
                                </Box>
                                <Box ml={1} mr={5}>
                                  <Tooltip title="Deliver board">
                                    <Button
                                      variant="outlined"
                                      color="info"
                                      onClick={() => setDilverBoard(true)}
                                    >
                                      <SendIcon />
                                    </Button>
                                  </Tooltip>
                                </Box>
                              </>
                            }
                          />
                        }
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
      {deliverBoard && (
        <CustomModel
          open={deliverBoard}
          handleClose={() => setDilverBoard(false)}
          dialogTitle="Share Kudoboard"
          hideSubmit
          dialogText={
            <>
              <Box width={400}>
                <Typography sx={{ color: "black" }}>
                  Copy the link below and share to {board.recipient}
                </Typography>
                <Box mt={2}>
                  <TextField
                    onClick={handleShareClick}
                    value={shareLink}
                    style={{ width: 400 }}
                  />
                </Box>
              </Box>
            </>
          }
        />
      )}
      {editTitle && (
        <EditBoardTitle
          open={editTitle}
          handleClose={() => setEditTitle(false)}
          board={board}
        />
      )}
    </>
  );
};
