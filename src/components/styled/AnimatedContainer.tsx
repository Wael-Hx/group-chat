import { makeStyles, Paper, PaperProps, Grow } from "@material-ui/core";
import { FC } from "react";

const useStyles = makeStyles((theme) => ({
  container: {
    margin: ({ topMargin }: any) => `${topMargin || "auto"} auto auto auto`,
    width: ({ width }: any) => (width ? width : "auto"),
    height: ({ height }: any) => (height ? height : "auto"),
    background: ({ background }: any) => background ?? "inherit",
    fontSize: ".8em",
    padding: "5px 5px",
  },
}));

interface AnimatedContainerProps extends PaperProps {
  width?: string | number;
  height?: string | number;
  topMargin?: string;
  background?: string;
}

const AnimatedContainer: FC<AnimatedContainerProps> = ({
  children,
  width,
  height,
  topMargin,
  background,
  ...props
}) => {
  const classes = useStyles({ width, height, topMargin, background });
  return (
    <Grow in timeout={500}>
      <Paper className={classes.container} {...props}>
        {children}
      </Paper>
    </Grow>
  );
};

export default AnimatedContainer;
