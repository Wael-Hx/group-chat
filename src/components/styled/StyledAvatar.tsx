import { FC } from "react";
import { Avatar, AvatarProps, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  avatar: {
    width: ({ size }: any) => 8 * size,
    height: ({ size }: any) => 8 * size,
  },
});

interface StyledAvatarProps extends AvatarProps {
  size: number;
}

const StyledAvatar: FC<StyledAvatarProps> = ({ children, size, ...props }) => {
  const classes = useStyles({ size });
  return (
    <Avatar {...props} className={classes.avatar}>
      {children}
    </Avatar>
  );
};

export default StyledAvatar;
