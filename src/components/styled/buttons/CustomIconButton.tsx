import {
  IconButtonProps,
  IconButton,
  CircularProgress,
} from "@material-ui/core";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import { ReactElement } from "react";

const CustomIconButton = ({
  icon,
  spinner,
  success,
  ...rest
}: IconButtonProps & CustomIconProps) => {
  return (
    <IconButton {...rest}>
      {spinner ? (
        <CircularProgress color="primary" size="inherit" />
      ) : success ? (
        <CheckBoxIcon style={{ fill: "green" }} />
      ) : (
        icon
      )}
    </IconButton>
  );
};

export default CustomIconButton;

interface CustomIconProps {
  icon: ReactElement;
  spinner?: boolean;
  success?: boolean;
}
