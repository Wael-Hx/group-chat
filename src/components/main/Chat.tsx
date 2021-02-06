import IconInput from "../styled/IconInput";
import PaperContainer from "../styled/PaperContainer";

const Chat = () => {
  return (
    <PaperContainer
      width="50%"
      height="100%"
      elevation={2}
      backgroundColor="dark"
      square
    >
      <IconInput />
    </PaperContainer>
  );
};

export default Chat;
