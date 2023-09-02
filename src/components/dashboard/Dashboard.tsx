import {
  Box,
  Typography,
  Skeleton,
  Grid,
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  Card,
  CardContent,
  IconButton,
  CardMedia,
  ListItemText,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { dateFormatter } from "../common/utils";
import { AppContext, AppContextType } from "@/context/AppContext";
import IosShareIcon from "@mui/icons-material/IosShare";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { IBoard } from "@/interfaces/BoardInterface";
import { deleteBoard, useGetAllBoards } from "@/api/boardApi";
import { useSnackbar } from "notistack";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CustomModel } from "../common/CustomModel";
import Link from "next/link";

const Dashboard = () => {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const { userData } = useContext(AppContext) as AppContextType;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [boardId, setBoardId] = useState<string>("");
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);

  const deleteBoardMutate = useMutation(deleteBoard);
  const { data, isLoading: boardDataLoading } = useGetAllBoards(userData?._id);
  const allBoardsData: IBoard[] = data?.data.boards;

  const open = Boolean(anchorEl);
  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    baordId: string
  ) => {
    setAnchorEl(event.currentTarget);
    setBoardId(baordId);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleShareClick = () => {
    // Todo: change to deployed link
    navigator.clipboard.writeText(
      `${
        process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
      }/boards/${boardId}?view=true`
    );
    enqueueSnackbar("Link copied", { variant: "success" });
    handleClose();
  };

  const handleDelete = async () => {
    setDeleteLoading(true);
    try {
      const response = await deleteBoardMutate.mutateAsync({ boardId });
      if (response?.status === 200) {
        queryClient.invalidateQueries(["GetAllBoards"]);
        enqueueSnackbar(response?.data?.status, { variant: "success" });
        setShowDeleteModal(false);
        setBoardId("");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <>
      <Box
        sx={{ backgroundColor: "#F9F9FA" }}
        minHeight={"calc(100vh - 70px)"}
        pb={4}
        pl={2}
        pr={2}
      >
        <Box maxWidth={800} margin="0 auto" pt={4}>
          <Typography variant="h5" fontWeight={600}>
            All Kudoboards
          </Typography>
        </Box>

        {boardDataLoading ? (
          <Box maxWidth={800} margin="20px auto" p={2}>
            <Skeleton
              variant="rectangular"
              animation="wave"
              width="100%"
              height={180}
              sx={{ bgcolor: "#ededed" }}
            >
              <Skeleton variant="circular" />
            </Skeleton>
          </Box>
        ) : !allBoardsData.length ? (
          <Box textAlign="center" mt={4}>
            <Typography color="secondary" variant="h6">
              No Kudoboard found :(
            </Typography>
          </Box>
        ) : (
          allBoardsData?.map((board) => (
            <Card sx={{ margin: "20px auto", maxWidth: 800, display: "flex" }}>
              <CardMedia
                component="img"
                sx={{ width: { sm: 200, xs: 150 } }}
                image="../../board-bg.jpg"
                alt="Live from space album cover"
              />
              <Box
                sx={{ display: "flex", flexDirection: "column", width: "100%" }}
              >
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h6"
                    fontWeight={700}
                    component="div"
                  >
                    {board.displayName}
                  </Typography>

                  <Typography gutterBottom variant="body1">
                    For {board.recipient}
                  </Typography>

                  <Box display="flex">
                    <Box mr={1}>
                      <Typography
                        gutterBottom
                        variant="body1"
                        color="secondary"
                      >
                        Creator
                      </Typography>
                    </Box>
                    <Typography>{userData?.name}</Typography>
                  </Box>

                  <Box display="flex">
                    <Box mr={1}>
                      <Typography variant="body1" color="secondary">
                        Created
                      </Typography>
                    </Box>
                    <Typography>
                      {board.createdAt ? dateFormatter(board.createdAt) : "-"}
                    </Typography>
                  </Box>
                </CardContent>
                <Box
                  pb={1}
                  pl={1}
                  display="flex"
                  justifyContent="space-between"
                >
                  <Link href={`/boards/${board.boardId}`}>
                    <Button color="primary">View Board</Button>
                  </Link>
                  <IconButton
                    id="board-button"
                    aria-controls={open ? "board-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={(e) => handleClick(e, board.boardId)}
                    sx={{ marginLeft: "auto" }}
                  >
                    <MoreVertIcon />
                  </IconButton>
                </Box>
              </Box>
            </Card>
          ))
        )}
      </Box>
      <Menu
        id="board-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "board-button",
        }}
      >
        <MenuItem
          onClick={() => {
            setShowDeleteModal(true), handleClose();
          }}
        >
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText> Delete Board</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleShareClick}>
          <ListItemIcon>
            <IosShareIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText> Share Board</ListItemText>
        </MenuItem>
      </Menu>

      {showDeleteModal && (
        <CustomModel
          open={showDeleteModal}
          handleClose={() => setShowDeleteModal(false)}
          dialogTitle={"Delete Kudoboard"}
          dialogText={
            "Do you really want to delete this board forever? This fully removes it from all users & cannot be undone."
          }
          handleSubmit={handleDelete}
          disableSubmit={deleteLoading}
        />
      )}
    </>
  );
};

export default Dashboard;
