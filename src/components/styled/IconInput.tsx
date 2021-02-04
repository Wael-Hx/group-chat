import { Divider, IconButton, InputBase, makeStyles } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: "100%",
    height: "fit-content",
    marginTop: "auto",
  },
  input: {
    flex: 1,
    backgroundColor: theme.palette.primary.main,
    padding: "0 5px",
    color: "white",
  },
  iconButton: {
    padding: 5,
    backgroundColor: theme.palette.primary.main,
    borderRadius: 5,
    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
    },
  },
  divider: {
    height: 28,
    margin: 2,
  },
  iconColor: {
    color: "silver",
  },
}));

const IconInput = () => {
  const classes = useStyles();

  return (
    <form className={classes.root}>
      <InputBase className={classes.input} />
      <Divider className={classes.divider} />
      <IconButton
        type="submit"
        className={classes.iconButton}
        aria-label="search"
      >
        <SendIcon classes={{ root: classes.iconColor }} />
      </IconButton>
    </form>
  );
};

export default IconInput;
