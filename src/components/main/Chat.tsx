import { useReactiveVar } from "@apollo/client";
import { Typography } from "@material-ui/core";
import { chatMessagesTree, loggedUserVar } from "../../cache";
import PaperContainer from "../styled/PaperContainer";
import IconInput from "./IconInput";
import Msg from "./Msg";

const Chat = ({ currentChat, modId }: ChatProps) => {
  const chatState = useReactiveVar(chatMessagesTree);
  const { user } = useReactiveVar(loggedUserVar);

  if (!currentChat) {
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
      >
        <Typography variant="h6">Chat /</Typography>
        <Typography variant="h6">{chatState.activeSub.name}</Typography>
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
