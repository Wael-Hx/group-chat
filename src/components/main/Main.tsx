import AnimatedContainer from "../styled/AnimatedContainer";
import Sidebar from "../styled/Sidebar";

const Main = () => {
  return (
    <AnimatedContainer
      component="main"
      background="#282c52"
      height="95%"
      width="97%"
      elevation={1}
    >
      <Sidebar
        width="25%"
        height="100%"
        elevation={0}
        backgroundColor="#141031"
      ></Sidebar>
    </AnimatedContainer>
  );
};

export default Main;
