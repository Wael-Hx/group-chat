import { makeStyles, Paper, PaperProps } from "@material-ui/core";

interface PaperContainerProps {
  backgroundColor?: "main" | "dark";
  width?: string;
  height?: string;
}

const useStyles = makeStyles((theme) => ({
  sidebar: {
    backgroundColor: (styleProps: PaperContainerProps) =>
      theme.palette.secondary[styleProps.backgroundColor || "main"],
    width: ({ width }: any) => width ?? "auto",
    height: ({ height }: any) => height ?? "auto",
    display: "flex",
    margin: "0 3px",
  },
}));

const PaperContainer = ({
  children,
  backgroundColor,
  width,
  height,
  ...props
}: PaperProps & PaperContainerProps) => {
  const styleProps = { backgroundColor, width, height };
  const classes = useStyles(styleProps);
  return (
    <Paper {...props} className={classes.sidebar}>
      {children}
    </Paper>
  );
};
export default PaperContainer;
