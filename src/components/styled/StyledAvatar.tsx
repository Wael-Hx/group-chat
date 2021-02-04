import { FC } from "react";
import { Avatar, AvatarProps, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  avatar: {
    width: (styleProps: StyledAvatarProps) => 8 * styleProps.size,
    height: (styleProps: StyledAvatarProps) => 8 * styleProps.size,
  },
});

interface StyledAvatarProps {
  size: number;
}

const StyledAvatar: FC<AvatarProps & StyledAvatarProps> = ({
  children,
  size,
  ...props
}) => {
  const styleProps = { size };
  const classes = useStyles(styleProps);
  return (
    <Avatar {...props} className={classes.avatar}>
      {children}
    </Avatar>
  );
};

export default StyledAvatar;
