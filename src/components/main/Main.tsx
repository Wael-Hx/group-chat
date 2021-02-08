import { useSubscription } from "@apollo/client";
import { useMediaQuery } from "@material-ui/core";
import { MYSUBS } from "../../gql/subscriptions/chat";
import AnimatedContainer from "../styled/AnimatedContainer";
import PaperContainer from "../styled/PaperContainer";
import Swipeable from "../styled/Swipeable";
import Chat from "./Chat";
import CommunitySideBar from "./CommunitySideBar";

const Main = () => {
  const { data, error } = useSubscription(MYSUBS, {
    variables: {
      mySubs: ["g1", "g2"],
    },
  });
  console.log(error);
  console.log(data);
  const mobileScreen = useMediaQuery("(max-width:1000px)");
  console.log(mobileScreen);
  return (
    <AnimatedContainer
      component="main"
      height="100%"
      width="100%"
      elevation={0}
      square
    >
      {mobileScreen ? (
        <Swipeable anchor="left">
          <PaperContainer width="100%" height="100%" elevation={2} square>
            <CommunitySideBar />
          </PaperContainer>
        </Swipeable>
      ) : (
        <PaperContainer width="25%" height="100%" elevation={2} square>
          <CommunitySideBar />
        </PaperContainer>
      )}
      <PaperContainer
        width={mobileScreen ? "100%" : "50%"}
        height="100%"
        elevation={2}
        backgroundColor="dark"
        square
      >
        <Chat />
      </PaperContainer>

      {mobileScreen ? (
        <Swipeable anchor="right">
          <PaperContainer width="100%" height="100%" elevation={2} square>
            <h2> contact list </h2>
          </PaperContainer>
        </Swipeable>
      ) : (
        <PaperContainer width="25%" height="100%" elevation={2} square>
          <h2> contact list </h2>
        </PaperContainer>
      )}
    </AnimatedContainer>
  );
};

export default Main;
