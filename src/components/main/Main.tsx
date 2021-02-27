import { KeyboardEvent, MouseEvent, useState } from "react";
import { useQuery, useReactiveVar, useSubscription } from "@apollo/client";
import { Divider, useMediaQuery } from "@material-ui/core";
import {
  chatMessagesTree,
  communityTabsData,
  loggedUserVar,
} from "../../cache";
import { GET_MY_COMMUNITIES } from "../../gql/queries/communities";
import { MYSUBS } from "../../gql/subscriptions/chat";
import { CommunityTabsData } from "../../types/communities.type";
import { ChatSubscriptionData } from "../../types/messages.type";
import AnimatedContainer from "../styled/containers/AnimatedContainer";
import PaperContainer from "../styled/containers/PaperContainer";
import Swipeable from "../styled/Swipeable";
import Chat from "./Chat";
import CommunitySideBar from "../groups/CommunitySideBar";
import Contacts from "../contacts/Contacts";

const Main = () => {
  const chatState = useReactiveVar(chatMessagesTree);
  const communityTabsState = useReactiveVar(communityTabsData);
  const { user, notifications, count } = useReactiveVar(loggedUserVar);
  const { communityTabs } = communityTabsState;

  const [drawerState, setDrawerState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor: Anchor, open: boolean) => (
    event: KeyboardEvent | MouseEvent
  ) => {
    if (
      event &&
      event.type === "keydown" &&
      ((event as KeyboardEvent).key === "Tab" ||
        (event as KeyboardEvent).key === "Shift")
    ) {
      return;
    }

    setDrawerState({ ...drawerState, [anchor]: open });
  };

  //open drawer from nested components
  const openDrawer = (anchor: Anchor, state: boolean) => {
    //trigger only on small screens
    if (!mobileScreen) {
      return;
    }
    setDrawerState({ ...drawerState, [anchor]: state });
  };

  useQuery<{ getMyCommunities: CommunityTabsData[] }>(GET_MY_COMMUNITIES, {
    onCompleted({ getMyCommunities }) {
      communityTabsData({
        ...communityTabsState,
        communityTabs: [
          ...communityTabsState.communityTabs,
          ...getMyCommunities,
        ],
      });
    },
  });

  useSubscription<ChatSubscriptionData>(MYSUBS, {
    variables: {
      mySubs: [user?.username, ...communityTabs.map((comm) => comm.id)],
    },

    onSubscriptionData({ subscriptionData }) {
      const { data } = subscriptionData;
      if (data?.messages) {
        if (data.messages.sub === user?.username) {
          loggedUserVar({
            ...loggedUserVar(),
            notifications: [...notifications, data.messages],
            count: count + 1,
          });
        } else if (!chatState.chats[data.messages.sub]) {
          chatMessagesTree({
            ...chatState,
            chats: {
              ...chatState.chats,
              [data.messages.sub]: [data.messages],
            },
          });
        } else {
          chatMessagesTree({
            ...chatState,
            chats: {
              ...chatState.chats,
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
      elevation={2}
      square
    >
      {mobileScreen ? (
        <Swipeable
          anchor={"left"}
          open={drawerState["left"]}
          onClose={toggleDrawer("left", false)}
          onOpen={toggleDrawer("left", true)}
        >
          <PaperContainer
            width="100%"
            height="100%"
            elevation={0}
            backgroundColor="dark"
            square
          >
            <CommunitySideBar communityTabs={communityTabs} />
          </PaperContainer>
        </Swipeable>
      ) : (
        <PaperContainer
          width="25%"
          height="100%"
          elevation={0}
          backgroundColor="dark"
          square
        >
          <CommunitySideBar communityTabs={communityTabs} />
        </PaperContainer>
      )}
      <Divider orientation="vertical" />
      <PaperContainer
        width={mobileScreen ? "100%" : "50%"}
        height="100%"
        elevation={0}
        backgroundColor="light"
        flexDirection="column"
        square
      >
        <Chat
          toggleAction={openDrawer}
          currentChat={chatState.activeSub.id}
          modId={chatState.activeSub.modId}
        />
      </PaperContainer>
      <Divider orientation="vertical" />
      {mobileScreen ? (
        <Swipeable
          anchor={"right"}
          open={drawerState["right"]}
          onClose={toggleDrawer("right", false)}
          onOpen={toggleDrawer("right", true)}
        >
          <PaperContainer
            width="100%"
            height="100%"
            backgroundColor="dark"
            elevation={0}
            square
            flexDirection="column"
            center
          >
            <Contacts />
          </PaperContainer>
        </Swipeable>
      ) : (
        <PaperContainer
          width="25%"
          height="100%"
          backgroundColor="dark"
          elevation={0}
          square
          flexDirection="column"
          center
        >
          <Contacts />
        </PaperContainer>
      )}
    </AnimatedContainer>
  );
};

export default Main;

export type Anchor = "top" | "left" | "bottom" | "right";
