import { Avatar, AvatarProps, Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  contactContainer: {
    minWidth: 130,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    padding: 5,
  },
}));

const ContactDetails = ({
  username,
  avatarUrl,
  ...props
}: AvatarProps & ContactDetailsProps) => {
  const classes = useStyles();
  return (
    <div className={classes.contactContainer}>
      <Avatar {...props} src={avatarUrl} alt={username}>
        {username.charAt(0)}
      </Avatar>
      <Typography variant="h6">{username}</Typography>
    </div>
  );
};

export default ContactDetails;

interface ContactDetailsProps {
  username: string;
  avatarUrl?: string;
}
