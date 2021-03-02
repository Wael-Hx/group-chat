import { ChangeEvent, FormEvent, useState } from "react";
import CustomIconButton from "../styled/buttons/CustomIconButton";
import Overlay from "../styled/containers/Overlay";
import InsertLinkIcon from "@material-ui/icons/InsertLink";
import DialogBox from "../styled/popup/DialogBox";
import { TextField } from "@material-ui/core";
import StyledForm from "../styled/StyledForm";
import StyledButton from "../styled/buttons/StyledButton";
import { useMutation } from "@apollo/client";
import { UPDATE_AVATAR } from "../../gql/mutations/users";

const UpdateAvatar = () => {
  const [avatarDialog, setAvatarDialog] = useState(false);
  const [avatar, setAvatar] = useState("");

  const [updateAvatar, { loading }] = useMutation(UPDATE_AVATAR);

  const closeAvatarDialog = () => {
    setAvatarDialog(false);
  };
  const openAvatarDialog = () => {
    setAvatarDialog(true);
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAvatar(e.target.value);
  };
  const submitNewAvatar = (e: FormEvent) => {
    e.preventDefault();
    updateAvatar({
      variables: {
        newAvatar: avatar,
      },
    });
    setAvatar("");
  };
  return (
    <>
      <Overlay
        icon={
          <CustomIconButton
            onClick={openAvatarDialog}
            style={{ color: "white", padding: 7 }}
            icon={<InsertLinkIcon fontSize="inherit" />}
          />
        }
      />
      <DialogBox
        fullWidth
        maxWidth="sm"
        closeDialog={closeAvatarDialog}
        open={avatarDialog}
        title="Set New Avatar Link"
      >
        <StyledForm
          onSubmit={submitNewAvatar}
          disableAnimation
          elevation={0}
          padding="5px 8px"
          width="100%"
        >
          <TextField
            name="avatar"
            type="text"
            label="avatar"
            value={avatar}
            onChange={handleChange}
            aria-label="set new avatar"
            required
            fullWidth
          />
          <StyledButton type="submit" disabled={loading} spinner={loading}>
            Submit
          </StyledButton>
        </StyledForm>
      </DialogBox>
    </>
  );
};

export default UpdateAvatar;
