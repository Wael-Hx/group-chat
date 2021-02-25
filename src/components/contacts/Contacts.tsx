import { useState } from "react";
import {
  useApolloClient,
  useMutation,
  useQuery,
  useReactiveVar,
} from "@apollo/client";
import { Divider, IconButton, Tooltip, Typography } from "@material-ui/core";
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
import { Contact } from "../../types/users.types";
import CustomIconButton from "../styled/buttons/CustomIconButton";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { LOGOUT } from "../../gql/mutations/users";
import { useHistory } from "react-router-dom";

const Contacts = () => {
  const { user } = useReactiveVar(loggedUserVar);
  const [open, setOpen] = useState(false);
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

  useQuery<{ myContacts: Contact[] }>(MY_CONTACTS, {
    skip: user?.type === "anonymous",
    onCompleted({ myContacts }) {
      loggedUserVar({
        ...loggedUserVar(),
        contactList: myContacts,
      });
    },
  });

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
      <PaperContainer width="70%" height="250px" elevation={2} topMargin="5px">
        <BackgroundImg cover={user?.avatar} overlayContent={user?.username} />
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
        <Typography className="sticky" variant="h6" color="primary">
          Contacts :
        </Typography>
        <ContactList />

        <CustomIconButton
          style={{ position: "fixed", bottom: "12%", right: "20px" }}
          color="default"
          onClick={logoutUser}
          spinner={loading}
          icon={<ExitToAppIcon style={{ fill: "#c71585" }} fontSize="medium" />}
        />

        <IconButton
          onClick={openDialog}
          style={{ position: "fixed", bottom: "5%", right: "20px" }}
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
