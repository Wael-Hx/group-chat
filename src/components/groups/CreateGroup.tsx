import { useMutation } from "@apollo/client";
import { TextField } from "@material-ui/core";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { CREATE_GROUP } from "../../gql/mutations/chat";
import StyledButton from "../styled/buttons/StyledButton";
import StyledForm from "../styled/StyledForm";
import { CommunityTabsData } from "../../types/communities.type";
import { communityTabsData } from "../../cache";

const CreateGroup = ({ closeDialog }: GroupComponentProps) => {
  const [group, setGroup] = useState({
    name: "",
    cover: "",
    cover_image: "",
    description: "",
  });
  const [err, setErr] = useState("");
  const userCommunities = communityTabsData();

  const [createGroup, { loading }] = useMutation<{
    createGroup: CommunityTabsData;
  }>(CREATE_GROUP, {
    onCompleted(data) {
      const { createGroup } = data;
      communityTabsData({
        ...userCommunities,
        communityTabs: [...userCommunities.communityTabs, createGroup],
      });
      console.log(userCommunities);
    },
    onError(error) {
      setErr(error.message);
    },
  });
  //reset error when submitting
  useEffect(() => {
    if (loading) {
      setErr("");
    }
  }, [loading]);

  const { name, cover, cover_image, description } = group;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setGroup({ ...group, [e.target.name]: e.target.value });
  };

  const submitGroup = (e: FormEvent) => {
    e.preventDefault();
    createGroup({
      variables: {
        name,
        cover,
        cover_image,
        description,
      },
    });
    closeDialog();
  };
  return (
    <StyledForm
      onSubmit={submitGroup}
      disableAnimation
      elevation={0}
      padding="5px 8px"
      width="100%"
    >
      <TextField
        label="name"
        value={name}
        onChange={handleChange}
        name="name"
        type="text"
        required
        autoComplete="off"
        error={err.includes("name")}
        helperText={err.includes("name") ? err : null}
      />
      <TextField
        label="cover"
        value={cover}
        onChange={handleChange}
        name="cover"
        type="text"
      />
      <TextField
        label="Tab Panel image"
        value={cover_image}
        onChange={handleChange}
        name="cover_image"
        type="text"
      />
      <TextField
        label="description"
        value={description}
        onChange={handleChange}
        name="description"
        type="text"
        autoComplete="off"
        required
        error={err.includes("description")}
        helperText={err.includes("description") ? err : null}
      />
      <div>
        <StyledButton type="submit" disabled={loading} spinner={loading}>
          submit
        </StyledButton>
      </div>
    </StyledForm>
  );
};

export default CreateGroup;

interface GroupComponentProps {
  closeDialog: () => void;
}
