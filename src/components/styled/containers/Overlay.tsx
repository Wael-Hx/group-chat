import { makeStyles } from "@material-ui/core";
import { ReactNode } from "react";

const useStyles = makeStyles({
  overlay: {
    position: "absolute",
    width: "100%",
    height: "20%",
    bottom: 0,
    backgroundColor: ({ color }) => color ?? "black",
    opacity: ({ opacity }: OverlayProps) => opacity ?? 0.5,
  },
});

const Overlay = (props: OverlayProps) => {
  const classes = useStyles(props);
  return <section className={classes.overlay}>{props.icon}</section>;
};

export default Overlay;

interface OverlayProps {
  icon: ReactNode;
  opacity?: number;
  color?: string;
}
