import { useReactiveVar } from "@apollo/client";
import { Typography } from "@material-ui/core";

import { loggedUserVar } from "../../cache";
import BackgroundImg from "../styled/BackgroundImg";
import PaperContainer from "../styled/PaperContainer";

const Contacts = () => {
  const { user } = useReactiveVar(loggedUserVar);
  return (
    <>
      <PaperContainer width="70%" height="250px" elevation={2}>
        <BackgroundImg cover={user?.avatar} />
      </PaperContainer>
      <Typography variant="h5"> {user?.username} </Typography>
    </>
  );
};

export default Contacts;
