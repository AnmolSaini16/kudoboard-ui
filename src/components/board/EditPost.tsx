import { editPost } from "@/api/boardApi";
import { ICard } from "@/interfaces/BoardInterface";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Grid,
  TextField,
  Typography,
  DialogActions,
  Button,
} from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import React, { useState } from "react";

export const EditPost = ({
  open,
  handleClose,
  card,
  boardId,
}: {
  open: boolean;
  handleClose: () => void;
  card: ICard;
  boardId: string;
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const editPostMutate = useMutation(editPost);
  const [loading, setLoading] = useState<boolean>(false);
  const [formValues, setFormValues] = useState<ICard>({
    msg: card.msg,
    madeBy: card.madeBy,
  });
  const [initialValues] = useState(formValues);

  const handleChange = (key: string, value: string) => {
    setFormValues({ ...formValues, [key]: value });
  };

  const disableButton = () => {
    let disable = false;
    if (!formValues.madeBy || !formValues.msg) disable = true;
    if (JSON.stringify(initialValues) === JSON.stringify(formValues))
      disable = true;
    return disable;
  };

  const handleEdit = async () => {
    setLoading(true);
    try {
      const payload = { ...formValues, cardId: card._id!, boardId: boardId };
      const response = await editPostMutate.mutateAsync({ payload });
      if (response?.status === 200) {
        queryClient.invalidateQueries(["GetBoardData", boardId]);
        enqueueSnackbar(response?.data?.status, { variant: "success" });
        handleClose();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="addPost-dialog-title"
      aria-describedby="addPost-dialog-description"
      maxWidth="xl"
    >
      <DialogTitle>Edit Post</DialogTitle>
      <DialogContent sx={{ width: 600, minHeight: 300 }}>
        <Box p={2}>
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={10}>
              <TextField
                placeholder="Message"
                variant="outlined"
                multiline
                fullWidth
                rows={6}
                value={formValues.msg}
                onChange={(e) => handleChange("msg", e.target.value)}
              />
            </Grid>
            <Grid item xs={10}>
              <Box mb={0.5}>
                <Typography>
                  What name would you like attached to your posts?
                </Typography>
              </Box>

              <TextField
                placeholder="Full Name"
                fullWidth
                value={formValues.madeBy}
                onChange={(e) => handleChange("madeBy", e.target.value)}
              />
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          onClick={handleEdit}
          disabled={disableButton() || loading}
        >
          Edit Post
        </Button>
        <Button variant="contained" onClick={handleClose}>
          Discard Post
        </Button>
      </DialogActions>
    </Dialog>
  );
};
