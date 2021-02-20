import { useEffect, useState } from "react";
import BackgroundImg from "../styled/BackgroundImg";
import StyledAvatar from "../styled/StyledAvatar";
import StyledTab from "../styled/StyledTab";
import StyledTabs from "../styled/StyledTabs";
import TabPanel from "../styled/TabPanel";
import ChatSections from "./ChatSections";
import PeopleIcon from "@material-ui/icons/People";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import { CommunitiesData } from "../../types/communities.type";
import { chatMessagesTree } from "../../cache";
import { Button, Divider } from "@material-ui/core";
import DialogBox from "../styled/DialogBox";
import CreateGroup from "./CreateGroup";

const CommunitySideBar = ({ communityTabs }: CommunitiesData) => {
  const [tab, setTab] = useState(chatMessagesTree().tabIndex);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const openDialog = () => {
    setOpen(true);
  };

  useEffect(() => {
    chatMessagesTree({
      ...chatMessagesTree(),
      activeSub: {
        modId: communityTabs[tab].comm_admin,
        name: communityTabs[tab].name,
      },
    });
  }, [communityTabs, tab]);

  const changeTab = (_: any, newTab: number) => {
    chatMessagesTree({
      ...chatMessagesTree(),
      activeSub: {
        modId: communityTabs[newTab].comm_admin,
        name: communityTabs[newTab].name,
      },
    });
    chatMessagesTree().tabIndex = newTab;
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
      <div className="add_group">
        <Button onClick={openDialog}>
          <StyledAvatar variant="rounded" size={8}>
            <GroupAddIcon fontSize="medium" />
          </StyledAvatar>
        </Button>

        <DialogBox
          fullWidth
          maxWidth="sm"
          closeDialog={handleClose}
          open={open}
          title="Create a new Group"
        >
          <CreateGroup closeDialog={handleClose} />
        </DialogBox>
      </div>
      <Divider orientation="vertical" />
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
