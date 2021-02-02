import { makeStyles, Paper, PaperProps } from "@material-ui/core";

interface SidebarProps extends PaperProps {
  backgroundColor?: string;
  width?: string;
  height?: string;
}

const useStyles = makeStyles((theme) => ({
  sidebar: {
    backgroundColor: ({ backgroundColor }: any) => backgroundColor ?? "inherit",
    width: ({ width }: any) => width ?? "auto",
    height: ({ height }: any) => height ?? "auto",
    display: "flex",
  },
}));

const Sidebar = ({
  children,
  backgroundColor,
  width,
  height,
  ...props
}: SidebarProps) => {
  const classes = useStyles({ backgroundColor, width, height });
  return (
    <Paper {...props} className={classes.sidebar}>
      {children}
    </Paper>
  );
};
export default Sidebar;
