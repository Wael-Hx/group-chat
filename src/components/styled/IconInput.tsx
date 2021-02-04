import { Divider, IconButton, InputBase, makeStyles } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "7px 4px",
    display: "flex",
    alignItems: "center",
    width: "100%",
    height: "fit-content",
    marginTop: "auto",
  },
  input: {
    flex: 1,
    padding: "0 5px",
  },
  iconButton: {
    padding: 5,
    backgroundColor: theme.palette.primary.main,
    borderRadius: 5,
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  divider: {
    height: 28,
    margin: 2,
  },
  iconColor: {
    color: theme.palette.primary.light,
  },
}));

const IconInput = () => {
  const classes = useStyles();

  return (
    <form className={classes.root}>
      <InputBase placeholder="message..." className={classes.input} />
      <Divider className={classes.divider} />
      <IconButton type="submit" className={classes.iconButton}>
        <SendIcon classes={{ root: classes.iconColor }} />
      </IconButton>
    </form>
  );
};

export default IconInput;
