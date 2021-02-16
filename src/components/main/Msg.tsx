import { makeStyles } from "@material-ui/core";
import { Message } from "../../types/messages.type";

const useStyles = makeStyles((theme) => ({
  msgContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
    padding: "0 2%",
  },
  body: {
    display: "flex",
    alignItems: "baseline",
  },
}));

const Msg = ({ message }: MsgProps) => {
  const classes = useStyles();

  return (
    <div className={classes.msgContainer}>
      <div className={classes.body}>
        <h3>
          <strong> {message.username}</strong> :
        </h3>
        <p>{message.body}</p>
      </div>
      <i> {message.timestamp} </i>
    </div>
  );
};

export default Msg;

interface MsgProps {
  message: Message;
}
