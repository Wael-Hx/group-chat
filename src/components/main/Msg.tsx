import { makeStyles, Typography, useTheme } from "@material-ui/core";
import { Message } from "../../types/messages.type";
import { getPaletteColor } from "../../utils/getPaletteColor";
import { getRelativeTime } from "../../utils/getRelativeTime";

const useStyles = makeStyles((theme) => ({
  msgContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
    padding: "0 5px",
    "& i": {
      fontSize: "0.6rem",
    },
  },
  body: {
    display: "flex",
    alignItems: "baseline",
    width: "80%",
    "& h3 , p": {
      margin: 4,
    },
    "& h3": {
      minWidth: "fit-content",
    },
    "& p": {
      maxWidth: "87%",
      [theme.breakpoints.down("sm")]: {
        maxWidth: "78%",
      },
    },
  },
}));

const Msg = ({ message, modId, userId }: MsgProps) => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <div className={classes.msgContainer}>
      <div className={classes.body}>
        <Typography
          variant="h6"
          style={{
            color:
              theme.palette[getPaletteColor(message.id, userId, modId)].main,
          }}
        >
          {`${message.username} :`}
        </Typography>
        <Typography variant="body1"> {message.body}</Typography>
      </div>
      <i> {getRelativeTime(message.timestamp)} </i>
    </div>
  );
};

export default Msg;

interface MsgProps {
  message: Message;
  userId: string;
  modId: string | null;
}
