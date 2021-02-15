import { useReactiveVar, useSubscription } from "@apollo/client";
import { useMediaQuery } from "@material-ui/core";
import { chatMessagesTree } from "../../cache";
import { MYSUBS } from "../../gql/subscriptions/chat";
import { ChatSubscriptionData } from "../../types/messages.type";
import AnimatedContainer from "../styled/AnimatedContainer";
import PaperContainer from "../styled/PaperContainer";
import Swipeable from "../styled/Swipeable";
import Chat from "./Chat";
import CommunitySideBar from "./CommunitySideBar";

const Main = () => {
  const chatState = useReactiveVar(chatMessagesTree);
  useSubscription<ChatSubscriptionData>(MYSUBS, {
    variables: {
      mySubs: ["g1", "g2"],
    },
    onSubscriptionData({ subscriptionData }) {
      const { data } = subscriptionData;
      if (data?.messages) {
        if (!chatState.chats[data.messages.sub]) {
          chatMessagesTree({
            ...chatMessagesTree(),
            chats: {
              ...chatMessagesTree().chats,
              [data.messages.sub]: [data.messages],
            },
          });
        } else {
          chatMessagesTree({
            ...chatMessagesTree(),
            chats: {
              ...chatMessagesTree().chats,
              [data.messages.sub]: [
                ...chatState.chats[data.messages.sub],
                data.messages,
              ],
            },
          });
        }
      }
    },
  });

  const mobileScreen = useMediaQuery("(max-width:1000px)");

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
