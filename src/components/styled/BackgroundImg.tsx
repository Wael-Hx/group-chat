import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  background: {
    width: "100%",
    background: ({ cover }: any) => `url(${cover}) center / cover no-repeat`,
    height: ({ height }: any) => height ?? "auto",
    marginTop: 10,
  },
}));

interface BackgroundProps {
  cover?: string;
  height?: string;
}

const BackgroundImg = ({ cover, height }: BackgroundProps) => {
  const classes = useStyles({ cover, height });
  return <div className={classes.background}></div>;
};

export default BackgroundImg;
