import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Slide,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";
import { TransitionProps } from "@mui/material/transitions";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface props {
  open: boolean;
  handleClose: () => void;
  dialogTitle: string;
  dialogText: string | JSX.Element;
  handleSubmit?: () => void;
  disableSubmit?: boolean;
  hideSubmit?: boolean;
}
export const CustomModel: React.FC<props> = ({
  open,
  handleClose,
  dialogTitle,
  handleSubmit,
  dialogText,
  disableSubmit = false,
  hideSubmit = false,
}) => {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="custom-model"
    >
      <DialogTitle>{dialogTitle}</DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent sx={{ maxWidth: 500, minWidth: 300 }}>
        <DialogContentText id="custom-model-description">
          {dialogText}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {!hideSubmit && (
          <Button
            variant="contained"
            disabled={disableSubmit}
            onClick={handleSubmit}
          >
            Ok
          </Button>
        )}

        <Button variant="contained" onClick={handleClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};
