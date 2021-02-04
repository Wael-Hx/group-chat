import { makeStyles, Tabs, TabsProps } from "@material-ui/core";
import { FC } from "react";

const useStyles = makeStyles({
  tabs: {
    marginTop: "7%",
  },
  indicator: {
    backgroundColor: "#643F89",
  },
});

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
