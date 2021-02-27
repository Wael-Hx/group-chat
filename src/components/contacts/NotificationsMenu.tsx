import {
  Menu,
  MenuItem,
  MenuProps,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { useMutation, useReactiveVar } from "@apollo/client";
import { Contact, NotificationsContent } from "../../types/users.types";
import { getRelativeTime } from "../../utils/getRelativeTime";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import CustomIconButton from "../styled/buttons/CustomIconButton";
import { ADD_CONTACT } from "../../gql/mutations/contacts";
import { loggedUserVar } from "../../cache";

const useStyles = makeStyles({
  listItem: {
    paddingLeft: 7,
    "&> button": {
      padding: "3px 7px",
    },
    "& > i": {
      paddingInline: 3,
    },
  },
});

const NotificationsMenu = ({
  notificationsContent,
  ...rest
}: MenuProps & NCProps) => {
  const classes = useStyles();
  const { contactList } = useReactiveVar(loggedUserVar);

  const [newContact, { loading }] = useMutation<{
    newContact: Contact;
  }>(ADD_CONTACT, {
    onCompleted({ newContact }) {
      loggedUserVar({
        ...loggedUserVar(),
        contactList: [...contactList, newContact],
      });
    },
  });

  return (
    <Menu {...rest}>
      {notificationsContent.length === 0 && (
        <MenuItem>
          <Typography variant="subtitle2">you have no notifications</Typography>
        </MenuItem>
      )}
      {notificationsContent.map((contact) => (
        <MenuItem
          onClick={() => {
            if (contactList.some((ct) => ct.id === contact.id)) {
              return;
            } else {
              newContact({ variables: { contact: contact.id } });
            }
          }}
          className={classes.listItem}
          key={contact.id}
        >
          {contact.body && contact.timestamp ? (
            <>
              <CustomIconButton
                size="small"
                icon={<PersonAddIcon fontSize="inherit" />}
                spinner={loading}
                spinnerSize={"0.75rem"}
                success={contactList.some((ct) => ct.id === contact.id)}
                disabled={
                  loading || contactList.some((ct) => ct.id === contact.id)
                }
              />
              <Typography variant="subtitle2">{contact.body}</Typography>
              <Typography variant="subtitle2" component="i">
                {getRelativeTime(contact.timestamp)}
              </Typography>
            </>
          ) : (
            <>
              <CustomIconButton
                size="small"
                icon={<PersonAddIcon fontSize="inherit" />}
                spinner={loading}
                spinnerSize={"0.75rem"}
                success={contactList.some((ct) => ct.id === contact.id)}
                disabled={
                  loading || contactList.some((ct) => ct.id === contact.id)
                }
              />
              <Typography variant="subtitle2">
                you have a pending request from {contact.username}
              </Typography>
            </>
          )}
        </MenuItem>
      ))}
    </Menu>
  );
};

export default NotificationsMenu;

interface NCProps {
  handleClose?: () => void;
  notificationsContent: NotificationsContent[];
}
