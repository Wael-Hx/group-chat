import { makeStyles } from "@material-ui/core";
import { FC, ReactNode } from "react";

const useStyles = makeStyles((theme) => ({
  tab: {
    paddingTop: 5,
    width: "75%",
    height: "100%",
  },
}));

interface TabPanelProps {
  children?: ReactNode;
  index: any;
  value: any;
}

const TabPanel: FC<TabPanelProps> = ({ children, value, index, ...other }) => {
  const classes = useStyles();
  return (
    <div
      className={classes.tab}
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <>{children}</>}
    </div>
  );
};

export default TabPanel;
