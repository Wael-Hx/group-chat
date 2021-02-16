import { makeStyles, Paper, PaperProps } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  sidebar: {
    backgroundColor: (styleProps: PaperContainerProps) =>
      theme.palette.bg[styleProps.backgroundColor || "main"],
    width: ({ width }: any) => width ?? "auto",
    height: ({ height }: any) => height ?? "auto",
    display: "flex",
    flexDirection: (styleProps: PaperContainerProps) =>
      styleProps.flexDirection ?? "row",
  },
}));

const PaperContainer = ({
  children,
  backgroundColor,
  width,
  height,
  flexDirection,
  ...props
}: PaperProps & PaperContainerProps) => {
  const styleProps = { backgroundColor, width, height, flexDirection };
  const classes = useStyles(styleProps);
  return (
    <Paper {...props} className={classes.sidebar}>
      {children}
    </Paper>
  );
};
export default PaperContainer;

interface PaperContainerProps {
  backgroundColor?: "main" | "dark" | "light" | "contrastText";
  width?: string;
  height?: string;
  flexDirection?:
    | "-moz-initial"
    | "inherit"
    | "initial"
    | "revert"
    | "unset"
    | "column"
    | "column-reverse"
    | "row"
    | "row-reverse";
}
