import { appConstants } from "@/constants/appConstants";
import {
  Box,
  TextField,
  Typography,
  Grid,
  Autocomplete,
  IconButton,
  Button,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import React, { useContext, useState } from "react";
import { CreateBoard } from "@/interfaces/BoardInterface";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBoard } from "@/api/boardApi";
import { v4 as uuidv4 } from "uuid";
import { useSnackbar } from "notistack";
import { useRouter } from "next/router";
import { AppContext, AppContextType } from "@/context/AppContext";

export const CreateBoardForm = () => {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { userData } = useContext(AppContext) as AppContextType;
  const [loading, setLoading] = useState<boolean>(false);
  const createBoardMutation = useMutation(createBoard);

  const [formValues, setFormValues] = useState<CreateBoard>({
    displayName: "",
    boardType: "",
    recipient: "",
  });

  const handleFormChange = (key: string, value: string) => {
    setFormValues({ ...formValues, [key]: value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const boardId = uuidv4().slice(0, 8);
      const payload = {
        ...formValues,
        boardId,
        createdBy: userData?._id!,
      };
      const response = await createBoardMutation.mutateAsync({ payload });
      if (response?.status === 200) {
        const boardId = response.data?.board.boardId;
        router.push(`/boards/${boardId}`);
        enqueueSnackbar(response?.data?.status, { variant: "success" });
        queryClient.removeQueries(["GetAllBoardData", userData?._id]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box maxWidth={500} margin="0 auto">
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={8}>
          <Typography variant="h5" fontWeight={600}>
            Create your board
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography variant="body1" color="#393535b9" fontWeight={400}>
            Choose an occasion, enter your recipient, and add a title.
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography>Select an occasion:*</Typography>
          <Autocomplete
            id="occasion-selector"
            options={appConstants.Occasions}
            getOptionLabel={(option: string) => option}
            value={formValues.boardType}
            onChange={(_event: React.SyntheticEvent, value: string | null) =>
              handleFormChange("boardType", value!)
            }
            renderInput={(params) => (
              <TextField {...params} placeholder="Select" />
            )}
          />
        </Grid>
        <Grid item xs={8}>
          <Typography>Who is the recipient?*</Typography>
          <TextField
            fullWidth
            id="recipient-textfield"
            placeholder="Name"
            value={formValues.recipient}
            onChange={(e) => handleFormChange("recipient", e.target.value)}
          />
          {/* Todo complete this */}
          <IconButton color="primary" sx={{ fontSize: 14, marginTop: 0.2 }}>
            <AddCircleIcon fontSize="inherit" sx={{ marginRight: 0.5 }} />
            Add another recipient
          </IconButton>
        </Grid>
        <Grid item xs={8}>
          <Typography>What should the title be?*</Typography>
          <TextField
            fullWidth
            id="displayname-textfield"
            placeholder="e.g. Happy Birthday!"
            value={formValues.displayName}
            onChange={(e) => handleFormChange("displayName", e.target.value)}
          />
        </Grid>
        <Grid item xs={8}>
          <Button
            fullWidth
            variant="contained"
            disabled={
              !formValues.boardType ||
              !formValues.displayName ||
              !formValues.recipient ||
              loading
            }
            onClick={handleSubmit}
          >
            Next
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
