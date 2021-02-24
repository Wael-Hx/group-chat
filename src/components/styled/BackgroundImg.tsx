import { makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  background: {
    position: "relative",
    width: "100%",
    background: ({ cover }: BackgroundProps) =>
      cover
        ? `url(${cover}) center / cover no-repeat`
        : theme.palette.bgSecondary.main,
    height: ({ height }: BackgroundProps) => height ?? "auto",
  },
}));

const BackgroundImg = ({ cover, height, overlayContent }: BackgroundProps) => {
  const classes = useStyles({ cover, height });
  return (
    <div className={`${classes.background} center`}>
      {!cover ? (
        <Typography variant="h4" component="i">
          {overlayContent}
        </Typography>
      ) : null}
    </div>
  );
};

export default BackgroundImg;

interface BackgroundProps {
  cover?: string;
  height?: string;
  overlayContent?: string;
}
