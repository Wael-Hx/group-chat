import {
  useApolloClient,
  useMutation,
  useQuery,
  useReactiveVar,
} from "@apollo/client";
import {
  Checkbox,
  CircularProgress,
  List,
  ListItemSecondaryAction,
  makeStyles,
  ListItem,
  Typography,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { chatMessagesTree, Contact, loggedUserVar } from "../../cache";
import { ADD_MEMBERS } from "../../gql/mutations/chat";
import { GET_MEMBERS } from "../../gql/queries/communities";
import ContactDetails from "../contacts/ContactDetails";
import StyledButton from "../styled/StyledButton";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 300,
    backgroundColor: theme.palette.background.paper,
  },
  confirm: {
    width: "100%",
    position: "sticky",
    bottom: 0,
    backgroundColor: theme.palette.bg.main,
    zIndex: 2,
  },
}));

const AddMembers = () => {
  const classes = useStyles();
  const client = useApolloClient();
  const { contactList } = useReactiveVar(loggedUserVar);
  const { activeSub } = useReactiveVar(chatMessagesTree);
  const [checkedMembers, setCheckedMembers] = useState<Contact[]>([]);

  //get cached members
  const cachedMembers: { membersList: Contact[] } | null = client.readQuery({
    query: GET_MEMBERS,
    variables: { groupId: activeSub.id },
  });
  const [members, setMembers] = useState<Contact[] | null>(
    cachedMembers?.membersList!
  );

  //make a query if there is no cached members
  const { loading } = useQuery<{
    membersList: Contact[];
  }>(GET_MEMBERS, {
    variables: { groupId: activeSub.id },
    skip: !!cachedMembers,
  });

  useEffect(() => {
    if (cachedMembers?.membersList) {
      setMembers(cachedMembers.membersList);
    }
  }, [cachedMembers]);

  //add new members mutation
  const [addMembers, { loading: addMembersLoading }] = useMutation(
    ADD_MEMBERS,
    {
      update(cache) {
        cache.writeQuery({
          query: GET_MEMBERS,
          variables: {
            groupId: activeSub.id,
          },
          data: {
            membersList: [...cachedMembers?.membersList!, ...checkedMembers],
          },
        });
      },
    }
  );

  const addNewMembers = () => {
    addMembers({
      variables: {
        groupId: activeSub.id,
        users: checkedMembers.map((mem) => mem.id),
      },
    });
  };
  //checkboxes
  const handleToggle = (contact: Contact) => () => {
    const currentIndex = checkedMembers.findIndex((ct) => ct.id === contact.id);
    const newChecked = [...checkedMembers];

    if (currentIndex === -1) {
      newChecked.push(contact);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setCheckedMembers(newChecked);
  };

  //show only contacts that are not members
  const contactsFilter = (contact: Contact, members: Contact[] | null) => {
    if (!members) {
      return contact;
    }
    return !members.map((m) => m.id).includes(contact.id);
  };

  if (loading) {
    return (
      <div className="center">
        <CircularProgress color="primary" size="1.7rem" />
      </div>
    );
  }

  const filteredContactList = contactList.filter((contact) =>
    contactsFilter(contact, members)
  );

  return (
    <>
      <List dense className={classes.root}>
        {filteredContactList.map((ct) => (
          <ListItem key={ct.id} button>
            <ContactDetails username={ct.username} avatarUrl={ct.avatar} />
            <ListItemSecondaryAction>
              <Checkbox
                edge="end"
                onChange={handleToggle(ct)}
                checked={checkedMembers.some((v) => v.id === ct.id)}
                inputProps={{ "aria-labelledby": ct.username }}
              />
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      {contactList.length === 0 ? (
        <Typography variant="h5" component="i">
          you have no contacts to add
        </Typography>
      ) : filteredContactList.length === 0 ? (
        <Typography variant="h5" component="i">
          All contacts added
        </Typography>
      ) : (
        <StyledButton
          onClick={addNewMembers}
          type="button"
          className={classes.confirm}
          spinner={addMembersLoading}
        >
          Confirm
        </StyledButton>
      )}
    </>
  );
};

export default AddMembers;
