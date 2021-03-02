import { useState, MouseEvent } from "react";
import {
  useApolloClient,
  useMutation,
  useQuery,
  useReactiveVar,
} from "@apollo/client";
import {
  Badge,
  Divider,
  IconButton,
  Tooltip,
  Typography,
} from "@material-ui/core";
import {
  loggedUserVar,
  initialChatState,
  initialCommunitiesState,
  initialUserState,
  communityTabsData,
  chatMessagesTree,
} from "../../cache";
import ContactList from "./ContactList";
import BackgroundImg from "../styled/BackgroundImg";
import PaperContainer from "../styled/containers/PaperContainer";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import DialogBox from "../styled/popup/DialogBox";
import SearchContacts from "./SearchContacts";
import { MY_CONTACTS } from "../../gql/queries/contacts";
import { Contact, Notifications } from "../../types/users.types";
import CustomIconButton from "../styled/buttons/CustomIconButton";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import { LOGOUT } from "../../gql/mutations/users";
import { useHistory } from "react-router-dom";
import NotificationsMenu from "./NotificationsMenu";
import UpdateAvatar from "./UpdateAvatar";

const Contacts = () => {
  const { user, count, notifications } = useReactiveVar(loggedUserVar);

  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const resetNotifications = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    loggedUserVar({
      ...loggedUserVar(),
      count: 0,
    });
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  const client = useApolloClient();
  const history = useHistory();

  const [logout, { loading }] = useMutation(LOGOUT, {
    onCompleted() {
      loggedUserVar({ ...initialUserState, loading: false });
      communityTabsData(initialCommunitiesState);
      chatMessagesTree(initialChatState);
      client.cache.reset();
      history.push("/");
    },
  });

  useQuery<{ myContacts: Contact[]; getNotifications: Notifications }>(
    MY_CONTACTS,
    {
      skip: user?.type === "anonymous",
      onCompleted({ myContacts, getNotifications: { sent, notifications } }) {
        loggedUserVar({
          ...loggedUserVar(),
          contactList: myContacts,
          sent,
          notifications,
          count: notifications.length,
        });
      },
    }
  );

  const handleClose = () => {
    setOpen(false);
  };

  const openDialog = () => {
    setOpen(true);
  };
  const logoutUser = () => {
    if (window.confirm("logout ?")) {
      if (user?.type === "anonymous") {
        loggedUserVar({ ...initialUserState, loading: false });
        communityTabsData(initialCommunitiesState);
        chatMessagesTree(initialChatState);
        client.cache.reset();
        history.push("/");
      } else {
        logout();
      }
    }
  };

  return (
    <>
      <PaperContainer width="60%" height="200px" elevation={2} topMargin="5px">
        <BackgroundImg cover={user?.avatar} overlayContent={user?.username} />
        <UpdateAvatar />
      </PaperContainer>
      <Typography variant="h5"> {user?.username} </Typography>

      <Divider orientation="horizontal" variant="middle" flexItem />

      <PaperContainer
        width="90%"
        elevation={0}
        topMargin="10px"
        backgroundColor="dark"
        flexDirection="column"
        height="50%"
        addClass="scroll"
      >
        <section
          className="sticky center"
          style={{ justifyContent: "space-between" }}
        >
          <Typography variant="h6" color="primary">
            Contacts :
          </Typography>
          <Badge
            variant="dot"
            overlap="circular"
            badgeContent={count}
            color="error"
            anchorOrigin={{ horizontal: "left", vertical: "top" }}
          >
            <CustomIconButton
              onClick={resetNotifications}
              style={{ padding: "7px" }}
              color="default"
              spinner={loading}
              icon={<NotificationsNoneIcon color="primary" fontSize="medium" />}
            />
          </Badge>
          <NotificationsMenu
            onClose={closeMenu}
            notificationsContent={notifications}
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            getContentAnchorEl={null}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          />
        </section>

        <ContactList />

        <CustomIconButton
          style={{ position: "fixed", top: "170px", right: "15px" }}
          color="default"
          onClick={logoutUser}
          spinner={loading}
          icon={<ExitToAppIcon htmlColor="#c71585" fontSize="medium" />}
        />

        <IconButton
          onClick={openDialog}
          style={{ position: "fixed", bottom: "50px", right: "15px" }}
          color="primary"
          edge="start"
        >
          <Tooltip title="search contacts">
            <PersonAddIcon fontSize="medium" />
          </Tooltip>
        </IconButton>

        <DialogBox
          fullWidth
          maxWidth="sm"
          closeDialog={handleClose}
          open={open}
          title="Search Contacts"
        >
          <SearchContacts />
        </DialogBox>
      </PaperContainer>
    </>
  );
};

export default Contacts;
