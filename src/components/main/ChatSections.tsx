import { Button, Divider, Typography } from "@material-ui/core";
import PaperContainer from "../styled/PaperContainer";
import SyncIcon from "@material-ui/icons/Sync";
import { GET_MEMBERS } from "../../gql/queries/communities";
import { useLazyQuery, useReactiveVar } from "@apollo/client";
import { chatMessagesTree, Contact } from "../../cache";
import MembersList from "../communities/MembersList";

const ChatSections = ({ description }: SectionProps) => {
  const [loadMembers, { loading, data }] = useLazyQuery<{
    membersList: Contact[];
  }>(GET_MEMBERS);
  const chatState = useReactiveVar(chatMessagesTree);

  const getMembersList = () => {
    if (!chatState.activeSub.id) {
      return;
    }
    loadMembers({ variables: { groupId: chatState.activeSub.id } });
  };

  return (
    <PaperContainer
      width="100%"
      height="75vh"
      flexDirection="column"
      elevation={0}
      center
      backgroundColor="dark"
      topMargin="10px"
    >
      <Typography variant="h5" gutterBottom>
        About
      </Typography>
      <Typography variant="body1" gutterBottom>
        {description ?? "no description provided"}
      </Typography>
      {chatState.activeSub.id ? (
        <Button variant="text">Add Members</Button>
      ) : null}

      <Divider orientation="horizontal" variant="middle" flexItem />
      <PaperContainer
        width="90%"
        elevation={0}
        topMargin="10px"
        backgroundColor="dark"
        flexDirection="column"
        height="100%"
        addClass="scroll"
      >
        <div onClick={getMembersList} className="aligned sticky pointer">
          <Typography variant="h6" color="primary">
            Members :
          </Typography>
          <SyncIcon
            style={{
              animation: `loop 1s linear infinite`,
              animationPlayState: loading ? "running" : "paused",
            }}
            fontSize="small"
            color="primary"
          />
        </div>
        <MembersList loading={loading} members={data?.membersList} />
        {chatState.activeSub.id ? null : (
          <Typography variant="h6" component="i">
            all users can see this chat
          </Typography>
        )}
      </PaperContainer>
    </PaperContainer>
  );
};

export default ChatSections;

interface SectionProps {
  description?: string;
}
