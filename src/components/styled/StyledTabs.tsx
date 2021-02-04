import { makeStyles, Tabs, TabsProps } from "@material-ui/core";
import { FC } from "react";

const useStyles = makeStyles((theme) => ({
  tabs: {
    marginTop: "7%",
  },
  indicator: {
    backgroundColor: theme.palette.primary.light,
    padding: "0 1px",
  },
}));

interface STProps extends TabsProps {
  topMargin?: string;
}

const StyledTabs: FC<STProps> = ({ children, ...props }) => {
  const classes = useStyles({ topMargin: props.topMargin });
  return (
    <Tabs
      className={classes.tabs}
      classes={{ indicator: classes.indicator }}
      {...props}
    >
      {children}
    </Tabs>
  );
};

export default StyledTabs;
