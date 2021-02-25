import { useLazyQuery, useMutation, useReactiveVar } from "@apollo/client";
import {
  CircularProgress,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemSecondaryAction,
  makeStyles,
  Typography,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { ChangeEvent, FormEvent, useState } from "react";
import { loggedUserVar } from "../../cache";
import { SEARCH_CONTACTS } from "../../gql/queries/contacts";
import CustomIconButton from "../styled/buttons/CustomIconButton";
import ContactDetails from "./ContactDetails";
import LibraryAddIcon from "@material-ui/icons/LibraryAdd";
import { ADD_CONTACT } from "../../gql/mutations/contacts";
import { Contact } from "../../types/users.types";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "7px 4px",
    display: "flex",
    alignItems: "center",
    width: "100%",
    height: "fit-content",
    marginTop: "auto",
    backgroundColor: theme.palette.bg.main,
  },
  input: {
    flex: 1,
    padding: "0 5px",
    borderBottom: `0.5px solid ${theme.palette.primary.light}`,
  },
  iconButton: {
    padding: 5,
    backgroundColor: theme.palette.bg.main,
    borderRadius: 5,
    "&:hover": {
      backgroundColor: theme.palette.bg.main,
    },
  },
  divider: {
    height: 28,
    margin: 2,
  },
  iconColor: {
    color: theme.palette.primary.light,
  },
  list: {
    width: "100%",
    maxHeight: "40vh",
    maxWidth: 300,
    backgroundColor: theme.palette.background.paper,
  },
}));

const SearchContacts = () => {
  const classes = useStyles();
  const [search, setSearch] = useState("");
  const { contactList, user } = useReactiveVar(loggedUserVar);

  const [getNewContacts, { loading, data }] = useLazyQuery<{
    contactList: Contact[];
  }>(SEARCH_CONTACTS);

  const [newContact, { loading: addingContactLoading }] = useMutation<{
    newContact: Contact;
  }>(ADD_CONTACT, {
    onCompleted({ newContact }) {
      loggedUserVar({
        ...loggedUserVar(),
        contactList: [...loggedUserVar().contactList, newContact],
      });
    },
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const searchContacts = (e: FormEvent) => {
    e.preventDefault();
    if (user?.type === "anonymous") {
      return;
    }
    getNewContacts({ variables: { search } });
    setSearch("");
  };
  return (
    <>
      <form onSubmit={searchContacts} className={`${classes.root} sticky`}>
        <InputBase
          value={search}
          name="username"
          aria-label="search for a contact"
          onChange={handleChange}
          placeholder="username..."
          autoComplete="off"
          className={classes.input}
        />
        <IconButton type="submit" className={classes.iconButton}>
          {loading ? (
            <CircularProgress color="primary" size="1.3rem" />
          ) : (
            <SearchIcon classes={{ root: classes.iconColor }} />
          )}
        </IconButton>
      </form>

      <List dense className={classes.list}>
        {user?.type === "anonymous" && (
          <Typography color="error" variant="h6" component="i">
            unavailable for temporary accounts!!
          </Typography>
        )}
        {data?.contactList.map((contact) => (
          <ListItem key={contact.id} button>
            <ContactDetails
              username={contact.username}
              avatarUrl={contact.avatar}
            />
            <ListItemSecondaryAction>
              <CustomIconButton
                onClick={() =>
                  newContact({ variables: { contact: contact.id } })
                }
                spinner={addingContactLoading}
                size="small"
                success={contactList.some((ct) => ct.id === contact.id)}
                disabled={contactList.some((ct) => ct.id === contact.id)}
                icon={<LibraryAddIcon color="primary" />}
              />
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default SearchContacts;
