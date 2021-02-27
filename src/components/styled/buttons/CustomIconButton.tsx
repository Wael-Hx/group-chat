import {
  IconButtonProps,
  IconButton,
  CircularProgress,
} from "@material-ui/core";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import AssignmentLateIcon from "@material-ui/icons/AssignmentLate";
import { ReactNode } from "react";

const CustomIconButton = ({
  icon,
  spinner,
  success,
  warn,
  spinnerSize,
  ...rest
}: IconButtonProps & CustomIconProps) => {
  return (
    <IconButton {...rest}>
      {spinner ? (
        <CircularProgress color="primary" size={spinnerSize || "inherit"} />
      ) : success ? (
        <CheckBoxIcon style={{ fill: "green" }} />
      ) : warn ? (
        <AssignmentLateIcon htmlColor="#ffc400" />
      ) : (
        icon
      )}
    </IconButton>
  );
};

export default CustomIconButton;

interface CustomIconProps {
  icon: ReactNode;
  spinner?: boolean;
  spinnerSize?: string;
  success?: boolean;
  warn?: boolean;
}
