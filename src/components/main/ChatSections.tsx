import { Typography } from "@material-ui/core";
import PaperContainer from "../styled/PaperContainer";

const ChatSections = ({ description }: SectionProps) => {
  return (
    <PaperContainer
      width="100%"
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
    </PaperContainer>
  );
};

export default ChatSections;

interface SectionProps {
  description?: string;
}
