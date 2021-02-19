import { ReactNode } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  title: {
    "& h2": {
      color: theme.palette.text.secondary,
      fontFamily: "Montserrat , Roboto , sans-serif",
      fontWeight: 500,
    },
  },
}));

const DialogBox = ({
  children,
  title,
  open,
  closeDialog,
  ...props
}: DialogBoxProps) => {
  const classes = useStyles();
  return (
    <div>
      <Dialog
        open={open}
        onClose={closeDialog}
        aria-labelledby="dialog-title"
        {...props}
      >
        <DialogTitle className={classes.title} id="dialog-title">
          {title}
        </DialogTitle>
        <DialogContent>{children}</DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DialogBox;

interface DialogBoxProps extends DialogProps {
  children: ReactNode;
  title: string;
  open: boolean;
  closeDialog: () => void;
}
