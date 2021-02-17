import { useState } from "react";
import BackgroundImg from "../styled/BackgroundImg";
import StyledAvatar from "../styled/StyledAvatar";
import StyledTab from "../styled/StyledTab";
import StyledTabs from "../styled/StyledTabs";
import TabPanel from "../styled/TabPanel";
import ChatSections from "./ChatSections";
import PeopleIcon from "@material-ui/icons/People";
import { CommunitiesData } from "../../types/communities.type";
import { chatMessagesTree } from "../../cache";

const CommunitySideBar = ({ communityTabs }: CommunitiesData) => {
  const [tab, setTab] = useState<number | null>(null);

  const changeTab = (_: any, newTab: number) => {
    chatMessagesTree({
      ...chatMessagesTree(),
      activeSub: {
        modId: communityTabs[newTab].comm_admin,
        name: communityTabs[newTab].name,
      },
    });

    setTab(newTab);
  };

  return (
    <>
      <StyledTabs
        orientation="vertical"
        value={tab}
        onChange={changeTab}
        variant="scrollable"
        allowScrollButtonsMobile
        scrollButtons="auto"
      >
        {communityTabs.map((comm, idx) => (
          <StyledTab
            key={idx}
            icon={
              <StyledAvatar
                variant="rounded"
                src={comm.cover}
                alt={comm.name}
                size={8}
              >
                {comm.cover ? null : <PeopleIcon fontSize="medium" />}
              </StyledAvatar>
            }
          />
        ))}
      </StyledTabs>

      {communityTabs.map((comm, idx) => (
        <TabPanel key={comm.name} value={tab} index={idx}>
          <BackgroundImg
            height="20%"
            cover={
              comm.cover_image ||
              `https://via.placeholder.com/700x400/202636/fff?text=${encodeURI(
                comm.name
              )}`
            }
          />
          <ChatSections />
        </TabPanel>
      ))}
    </>
  );
};

export default CommunitySideBar;
