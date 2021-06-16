import { useReactiveVar } from "@apollo/client";
import { Typography, makeStyles } from "@material-ui/core";
import { loggedUserVar } from "../../cache";
import ContactDetails from "./ContactDetails";

const useStyles = makeStyles({
  contactList: {
    alignSelf: "flex-start",
  },
});

const ContactList = () => {
  const classes = useStyles();
  const { contactList } = useReactiveVar(loggedUserVar);

  if (contactList.length === 0) {
    return (
      <Typography variant="h6" gutterBottom component="i">
        you did not add any contact yet
      </Typography>
    );
  }
  return (
    <div className={classes.contactList}>
      {contactList.map((contact) => (
        <ContactDetails
          key={contact.id}
          avatarUrl={contact.avatar}
          username={contact.username}
        />
      ))}
    </div>
  );
};

export default ContactList;
