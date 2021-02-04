import AnimatedContainer from "../styled/AnimatedContainer";
import PaperContainer from "../styled/PaperContainer";
import Chat from "./Chat";
import CommunitySideBar from "./CommunitySideBar";

const Main = () => {
  return (
    <AnimatedContainer component="main" height="95%" width="97%" elevation={0}>
      <PaperContainer width="25%" height="100%" elevation={2}>
        <CommunitySideBar />
      </PaperContainer>
      <Chat />
      <PaperContainer width="25%" height="100%" elevation={2}></PaperContainer>
    </AnimatedContainer>
  );
};

export default Main;
