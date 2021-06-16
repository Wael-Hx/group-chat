import { makeStyles, Typography } from "@material-ui/core";
import { Contact } from "../../types/users.types";
import ContactDetails from "../contacts/ContactDetails";

const useStyles = makeStyles({
  contactList: {
    alignSelf: "flex-start",
  },
});

const MembersList = ({ loading, members }: MembersListProps) => {
  const classes = useStyles();

  if (!loading && members?.length === 0) {
    return (
      <Typography variant="h6" gutterBottom component="i">
        no members added yet
      </Typography>
    );
  }
  return (
    <div className={classes.contactList}>
      {members?.map((member) => (
        <ContactDetails
          username={member.username}
          avatarUrl={member.avatar}
          key={member.id}
        />
      ))}
    </div>
  );
};

export default MembersList;

interface MembersListProps {
  loading: boolean;
  members?: Contact[];
}
