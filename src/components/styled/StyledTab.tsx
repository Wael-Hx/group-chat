import { makeStyles, Theme, Tab, TabProps } from "@material-ui/core";
import { FC } from "react";

const useStyles = makeStyles((theme: Theme) => ({
  tab: {
    textTransform: "none",
    minWidth: 72,
    fontWeight: theme.typography.fontWeightRegular,
    fontFamily: "Raleway, Roboto, Segoe UI",
    "&:hover": {
      opacity: 1,
    },
    "&$selected": {
      backgroundColor: "#4b2c6a",
    },
    "&:focus": {
      backgroundColor: "#4b2c6a",
    },
  },
  selected: {},
}));

const StyledTab: FC<TabProps> = ({ ...props }) => {
  const classes = useStyles();
  return <Tab className={classes.tab} {...props} />;
};

export default StyledTab;
