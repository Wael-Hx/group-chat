import { useSubscription } from "@apollo/client";
import { MYSUBS } from "../../gql/subscriptions/chat";
import AnimatedContainer from "../styled/AnimatedContainer";
import PaperContainer from "../styled/PaperContainer";
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

  return (
    <AnimatedContainer
      component="main"
      height="100%"
      width="100%"
      elevation={0}
      square
    >
      <PaperContainer width="25%" height="100%" elevation={2} square>
        <CommunitySideBar />
      </PaperContainer>
      <Chat />
      <PaperContainer
        width="25%"
        height="100%"
        elevation={2}
        square
      ></PaperContainer>
    </AnimatedContainer>
  );
};

export default Main;
