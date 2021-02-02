import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  background: {
    width: "100%",
    background: ({ cover }: any) => `url(${cover}) center / cover no-repeat`,
    height: "20%",
    marginTop: 10,
  },
}));

interface BackgroundProps {
  cover?: string;
}

const BackgroundImg = ({ cover }: BackgroundProps) => {
  const classes = useStyles({ cover });
  return <div className={classes.background}></div>;
};

export default BackgroundImg;
