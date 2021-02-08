import { SwipeableDrawer, makeStyles } from "@material-ui/core";
import { KeyboardEvent, MouseEvent, ReactNode, useState } from "react";

const useStyles = makeStyles((theme) => ({
  paper: {
    width: "80vw",
  },
}));

type Anchor = "top" | "left" | "bottom" | "right";

interface SwipeableComponentProps {
  children?: ReactNode;
  anchor: Anchor;
}

const Swipeable = ({ children, anchor }: SwipeableComponentProps) => {
  const classes = useStyles();
  const [drawerState, setDrawerState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor: Anchor, open: boolean) => (
    event: KeyboardEvent | MouseEvent
  ) => {
    if (
      event &&
      event.type === "keydown" &&
      ((event as KeyboardEvent).key === "Tab" ||
        (event as KeyboardEvent).key === "Shift")
    ) {
      return;
    }

    setDrawerState({ ...drawerState, [anchor]: open });
  };
  return (
    <SwipeableDrawer
      anchor={anchor}
      open={drawerState[anchor]}
      onClose={toggleDrawer(anchor, false)}
      onOpen={toggleDrawer(anchor, true)}
      PaperProps={{ className: classes.paper }}
    >
      {children}
    </SwipeableDrawer>
  );
};

export default Swipeable;
