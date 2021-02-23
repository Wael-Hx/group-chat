import { useMutation, useReactiveVar } from "@apollo/client";
import { Divider, IconButton, InputBase, makeStyles } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import { ChangeEvent, FormEvent, useState } from "react";
import { chatMessagesTree, loggedUserVar } from "../../cache";
import { SEND_MESSAGE } from "../../gql/mutations/chat";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "7px 4px",
    display: "flex",
    alignItems: "center",
    width: "100%",
    height: "fit-content",
    marginTop: "auto",
    borderTop: "1px dashed silver",
  },
  input: {
    flex: 1,
    padding: "0 5px",
  },
  iconButton: {
    padding: 5,
    backgroundColor: theme.palette.bg.main,
    borderRadius: 5,
    "&:hover": {
      backgroundColor: theme.palette.bg.main,
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
  const { user } = useReactiveVar(loggedUserVar);
  const chatState = useReactiveVar(chatMessagesTree);

  const [msgBody, setMsgBody] = useState("");
  const [sendMsg] = useMutation(SEND_MESSAGE);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMsgBody(e.target.value);
  };

  const submitMessage = (e: FormEvent) => {
    e.preventDefault();
    sendMsg({
      variables: {
        id: user?.id,
        username: user?.username,
        body: msgBody,
        to: chatState.activeSub.id,
      },
    });
    setMsgBody("");
  };
  return (
    <form onSubmit={submitMessage} className={classes.root}>
      <InputBase
        value={msgBody}
        name="message"
        aria-label="message input"
        onChange={handleChange}
        placeholder="message..."
        autoComplete="off"
        className={classes.input}
      />
      <Divider className={classes.divider} />
      <IconButton type="submit" className={classes.iconButton}>
        <SendIcon classes={{ root: classes.iconColor }} />
      </IconButton>
    </form>
  );
};

export default IconInput;
