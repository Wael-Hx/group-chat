import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  background: {
    width: "100%",
    background: ({ cover }: BackgroundProps) =>
      `url(${cover}) center / cover no-repeat`,
    height: ({ height }: BackgroundProps) => height ?? "auto",
  },
}));

const BackgroundImg = ({ cover, height }: BackgroundProps) => {
  const classes = useStyles({ cover, height });
  return <div className={classes.background}></div>;
};

export default BackgroundImg;

interface BackgroundProps {
  cover?: string;
  height?: string;
}
