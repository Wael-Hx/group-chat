import {
  SwipeableDrawer,
  makeStyles,
  SwipeableDrawerProps,
} from "@material-ui/core";

const useStyles = makeStyles({
  paper: {
    width: "87vw",
  },
  swipeArea: {
    backgroundColor: "red",
    border: "1px solid red",
  },
});

const Swipeable = ({ children, ...rest }: SwipeableDrawerProps) => {
  const classes = useStyles();

  return (
    <SwipeableDrawer {...rest} PaperProps={{ className: classes.paper }}>
      {children}
    </SwipeableDrawer>
  );
};

export default Swipeable;
