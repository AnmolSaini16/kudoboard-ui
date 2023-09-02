import React, { useState } from "react";
import { CustomModel } from "../common/CustomModel";
import { IBoard } from "@/interfaces/BoardInterface";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editBoardDisplayName } from "@/api/boardApi";
import { useSnackbar } from "notistack";

interface Props {
  open: boolean;
  handleClose: () => void;
  board: IBoard;
}
export const EditBoardTitle: React.FC<Props> = ({
  open,
  handleClose,
  board,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const editBoardTitleMutate = useMutation(editBoardDisplayName);
  const [title, setTitle] = useState<string>(board.displayName);
  const [intialTitle] = useState(title);
  const [loading, setLoading] = useState<boolean>(false);

  const handleEditTitle = async () => {
    setLoading(true);
    try {
      const payload = { boardId: board.boardId, displayName: title };
      const response = await editBoardTitleMutate.mutateAsync({ payload });
      if (response?.status === 200) {
        queryClient.invalidateQueries(["GetBoardData", board.boardId]);
        enqueueSnackbar(response?.data?.status, { variant: "success" });
        handleClose();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const disableButton = () => {
    let disable = false;
    if (
      !title ||
      JSON.stringify(title) === JSON.stringify(intialTitle) ||
      loading
    )
      disable = true;
    return disable;
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="addPost-dialog-title"
      aria-describedby="addPost-dialog-description"
      maxWidth="xl"
    >
      <DialogTitle>Edit Board Title</DialogTitle>
      <DialogContent sx={{ width: 400, minHeight: 100 }}>
        <Box p={2}>
          <TextField
            placeholder="Enter a title"
            value={title}
            variant="outlined"
            fullWidth
            onChange={(e) => setTitle(e.target.value)}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          disabled={disableButton()}
          onClick={handleEditTitle}
        >
          Edit Title
        </Button>
        <Button variant="contained" onClick={handleClose}>
          Discard Edit
        </Button>
      </DialogActions>
    </Dialog>
  );
};
