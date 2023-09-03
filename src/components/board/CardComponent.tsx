import { IBoard, ICard } from "@/interfaces/BoardInterface";
import { Masonry } from "@mui/lab";
import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import MoreHorizSharpIcon from "@mui/icons-material/MoreHorizSharp";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorSharpIcon from "@mui/icons-material/BorderColorSharp";
import React, { useState } from "react";
import { EditPost } from "./EditPost";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePost } from "@/api/boardApi";
import { useSnackbar } from "notistack";
import { CustomModel } from "../common/CustomModel";
import { CheckPermission } from "../common/CheckPermission";

export const CardComponent = ({
  board,
  boardLoading,
}: {
  board: IBoard;
  boardLoading: boolean;
}) => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  const deleteCardMutate = useMutation(deletePost);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [showEdit, setShowEdit] = useState<boolean>(false);
  const [card, setCard] = useState<ICard | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);

  const open = Boolean(anchorEl);
  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    card: ICard
  ) => {
    setAnchorEl(event.currentTarget);
    setCard(card);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = async () => {
    setDeleteLoading(true);
    try {
      const payload = { boardId: board.boardId, cardId: card?._id! };
      const response = await deleteCardMutate.mutateAsync({ payload });
      if (response?.status === 200) {
        queryClient.invalidateQueries(["GetBoardData", board.boardId]);
        enqueueSnackbar(response?.data?.status, { variant: "success" });
        setShowDeleteModal(false);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <>
      <Box pt={6} pl={2} pr={2}>
        {boardLoading ? (
          <Box textAlign="center" mt={2}>
            <CircularProgress color="primary" />
          </Box>
        ) : (
          <Masonry columns={3} spacing={3}>
            {board?.cards.map((card: ICard) => (
              <Card
                raised
                sx={{ minWidth: { xs: "100%", sm: 350 } }}
                key={card._id}
              >
                <CardContent sx={{ padding: 3 }}>
                  <Typography gutterBottom textAlign={"justify"}>
                    {card.msg}
                  </Typography>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <CheckPermission
                      render={
                        <IconButton
                          id="board-button"
                          aria-controls={open ? "board-menu" : undefined}
                          aria-haspopup="true"
                          aria-expanded={open ? "true" : undefined}
                          onClick={(e) => handleClick(e, card)}
                        >
                          <MoreHorizSharpIcon />
                        </IconButton>
                      }
                    />

                    <Typography color="secondary" fontSize={14} noWrap>
                      From {card.madeBy}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Masonry>
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
            setShowEdit(true), handleClose();
          }}
        >
          <ListItemIcon>
            <BorderColorSharpIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Edit message</ListItemText>
        </MenuItem>
        <CheckPermission
          checkAuth
          boardId={board.boardId}
          render={
            <MenuItem
              onClick={() => {
                setShowDeleteModal(true), handleClose();
              }}
            >
              <ListItemIcon>
                <DeleteIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Delete</ListItemText>
            </MenuItem>
          }
        />
      </Menu>
      {showEdit && (
        <EditPost
          open={showEdit}
          handleClose={() => setShowEdit(false)}
          card={card!}
          boardId={board.boardId}
        />
      )}

      {showDeleteModal && (
        <CustomModel
          open={showDeleteModal}
          handleClose={() => setShowDeleteModal(false)}
          dialogTitle={"Delete Post"}
          dialogText={"Really delete this post?"}
          handleSubmit={handleDelete}
          disableSubmit={deleteLoading}
        />
      )}
    </>
  );
};
