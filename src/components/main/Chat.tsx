import { useReactiveVar } from "@apollo/client";
import { Typography } from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import { chatMessagesTree, loggedUserVar } from "../../cache";
import CustomIconButton from "../styled/buttons/CustomIconButton";
import PaperContainer from "../styled/containers/PaperContainer";
import IconInput from "./IconInput";
import Msg from "./Msg";

const Chat = ({ currentChat, modId }: ChatProps) => {
  const chatState = useReactiveVar(chatMessagesTree);
  const { user } = useReactiveVar(loggedUserVar);

  if (typeof currentChat === "undefined" || currentChat === null) {
    return (
      <div className="dev center">
        <h1>
          hello {user?.username} <br /> click on the general section or create a
          new group
        </h1>
      </div>
    );
  }

  return (
    <>
      <PaperContainer
        width="100%"
        height="5%"
        elevation={1}
        addClass="center fixed"
        center
        style={{ justifyContent: "space-between" }}
      >
        <CustomIconButton
          icon={<PeopleAltIcon color="primary" fontSize="small" />}
        />
        <Typography variant="h6">Chat / {chatState.activeSub.name}</Typography>
        <CustomIconButton
          icon={<AccountCircleIcon color="primary" fontSize="small" />}
        />
      </PaperContainer>
      <section className="scroll">
        {chatState.chats[currentChat]?.map((msg, idx) => (
          <Msg key={idx} message={msg} userId={user?.id!} modId={modId} />
        ))}
      </section>
      <IconInput />
    </>
  );
};

export default Chat;

interface ChatProps {
  currentChat: string | null;
  modId: string | null;
}
