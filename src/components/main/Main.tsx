import AnimatedContainer from "../styled/AnimatedContainer";
import PaperContainer from "../styled/PaperContainer";
import Chat from "./Chat";
import CommunitySideBar from "./CommunitySideBar";

const Main = () => {
  return (
    <AnimatedContainer component="main" height="95%" width="97%" elevation={1}>
      <PaperContainer width="25%" height="100%" elevation={0}>
        <CommunitySideBar />
      </PaperContainer>
      <Chat />
      <PaperContainer width="25%" height="100%" elevation={0}></PaperContainer>
    </AnimatedContainer>
  );
};

export default Main;
