import { Alert, Snackbar, SnackbarProps, AlertProps } from "@material-ui/core";
import { FC, useState } from "react";

interface AlertMessageProps extends SnackbarProps {
  messageType?: "error" | "info" | "warning" | "success";
  alertText: string;
}

const AlertMessage: FC<AlertMessageProps & AlertProps> = ({
  alertText,
  messageType,
  ...props
}) => {
  const [open, setOpen] = useState(true);

  return (
    <Snackbar
      open={open}
      {...props}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert
        onClose={() => setOpen(false)}
        variant="filled"
        severity={messageType || "info"}
      >
        {alertText}
      </Alert>
    </Snackbar>
  );
};

export default AlertMessage;
