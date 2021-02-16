import { useReactiveVar } from "@apollo/client";
import { chatMessagesTree } from "../../cache";
import IconInput from "../styled/IconInput";
import Msg from "./Msg";

const Chat = ({ currentChat }: ChatProps) => {
  const chatState = useReactiveVar(chatMessagesTree);

  if (!currentChat) {
    return (
      <div className="dev center">
        <h1> click on the general section or create a new group</h1>
      </div>
    );
  }

  return (
    <>
      <section className="scroll">
        {chatState.chats[currentChat]?.map((msg) => (
          <Msg key={msg.username} message={msg} />
        ))}
      </section>
      <IconInput />
    </>
  );
};

export default Chat;

interface ChatProps {
  currentChat: string | null;
}
