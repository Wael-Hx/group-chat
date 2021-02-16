import { useQuery, useReactiveVar, useSubscription } from "@apollo/client";
import { useMediaQuery } from "@material-ui/core";
import { chatMessagesTree, communityTabsData } from "../../cache";
import { GET_MY_COMMUNITIES } from "../../gql/queries/communities";
import { MYSUBS } from "../../gql/subscriptions/chat";
import { CommunityTabsData } from "../../types/communities.type";
import { ChatSubscriptionData } from "../../types/messages.type";
import AnimatedContainer from "../styled/AnimatedContainer";
import PaperContainer from "../styled/PaperContainer";
import Swipeable from "../styled/Swipeable";
import Chat from "./Chat";
import CommunitySideBar from "./CommunitySideBar";

const Main = () => {
  const chatState = useReactiveVar(chatMessagesTree);
  const { communityTabs } = useReactiveVar(communityTabsData);

  useQuery<{ getMyCommunities: CommunityTabsData[] }>(GET_MY_COMMUNITIES, {
    onCompleted({ getMyCommunities }) {
      communityTabsData({
        ...communityTabsData(),
        communityTabs: [
          ...communityTabsData().communityTabs,
          ...getMyCommunities,
        ],
      });
    },
  });

  useSubscription<ChatSubscriptionData>(MYSUBS, {
    variables: {
      mySubs: communityTabs.map((comm) => comm.name),
    },

    onSubscriptionData({ subscriptionData }) {
      const { data } = subscriptionData;
      if (data?.messages) {
        if (!chatState.chats[data.messages.sub]) {
          chatMessagesTree({
            ...chatMessagesTree(),
            chats: {
              ...chatState.chats,
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
            <CommunitySideBar communityTabs={communityTabs} />
          </PaperContainer>
        </Swipeable>
      ) : (
        <PaperContainer width="25%" height="100%" elevation={2} square>
          <CommunitySideBar communityTabs={communityTabs} />
        </PaperContainer>
      )}
      <PaperContainer
        width={mobileScreen ? "100%" : "50%"}
        height="100%"
        elevation={2}
        backgroundColor="dark"
        flexDirection="column"
        square
      >
        <Chat currentChat={chatState.activeSub} />
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
