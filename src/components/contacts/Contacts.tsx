import { useState } from "react";
import { useQuery, useReactiveVar } from "@apollo/client";
import { Divider, IconButton, Tooltip, Typography } from "@material-ui/core";
import { loggedUserVar } from "../../cache";
import ContactList from "./ContactList";
import BackgroundImg from "../styled/BackgroundImg";
import PaperContainer from "../styled/PaperContainer";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import DialogBox from "../styled/DialogBox";
import SearchContacts from "./SearchContacts";
import { MY_CONTACTS } from "../../gql/queries/contacts";
import { Contact } from "../../cache";

const Contacts = () => {
  const { user } = useReactiveVar(loggedUserVar);
  const [open, setOpen] = useState(false);

  useQuery<{ myContacts: Contact[] }>(MY_CONTACTS, {
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
  return (
    <>
      <PaperContainer width="70%" height="250px" elevation={2} topMargin="5px">
        <BackgroundImg cover={user?.avatar} />
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

        <IconButton
          onClick={openDialog}
          style={{ position: "fixed", bottom: "3%", right: "20px" }}
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
