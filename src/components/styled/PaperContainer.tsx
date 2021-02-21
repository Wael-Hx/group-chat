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
    alignItems: ({ center }: PaperContainerProps) =>
      center ? "center" : "normal",
    marginTop: ({ topMargin }: PaperContainerProps) =>
      `${topMargin || "initial"}`,
  },
}));

const PaperContainer = ({
  children,
  backgroundColor,
  width,
  height,
  flexDirection,
  center,
  topMargin,
  addClass,
  ...props
}: PaperProps & PaperContainerProps) => {
  const styleProps = {
    backgroundColor,
    width,
    height,
    flexDirection,
    center,
    topMargin,
  };
  const classes = useStyles(styleProps);
  return (
    <Paper {...props} className={`${classes.sidebar} ${addClass ?? ""}`}>
      {children}
    </Paper>
  );
};
export default PaperContainer;

interface PaperContainerProps {
  backgroundColor?: "main" | "dark" | "light" | "contrastText";
  width?: string;
  height?: string;
  center?: boolean;
  topMargin?: string;
  addClass?: string;
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
