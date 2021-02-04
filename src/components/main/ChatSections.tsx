import { useState } from "react";
import { makeStyles, ToggleButton, ToggleButtonGroup } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  toggleRoot: {
    padding: 7,
    height: 30,
    width: "100%",
    margin: "7px 0",
    fontSize: "1rem",
  },
  label: {
    height: "inherit",
  },
  group: {
    marginTop: theme.spacing(5),
    width: "100%",
  },
}));

const ChatSections = () => {
  const [section, setSection] = useState<string | null>("main");
  const classes = useStyles();
  const changeSection = (
    _: React.MouseEvent<HTMLElement>,
    newSection: string | null
  ) => {
    setSection(newSection);
  };

  return (
    <>
      <ToggleButtonGroup
        className={classes.group}
        value={section}
        orientation="vertical"
        exclusive
        onChange={changeSection}
        aria-label="text alignment"
      >
        <ToggleButton
          classes={{
            root: classes.toggleRoot,
            label: classes.label,
          }}
          value="left"
          aria-label="left aligned"
        >
          <h6> main </h6>
        </ToggleButton>
        <ToggleButton
          classes={{
            root: classes.toggleRoot,
            label: classes.label,
          }}
          value="center"
          aria-label="centered"
        >
          <h6> new stuff </h6>
        </ToggleButton>
        <ToggleButton
          classes={{
            root: classes.toggleRoot,
            label: classes.label,
          }}
          value="right"
          aria-label="right aligned"
        >
          <h6> other </h6>
        </ToggleButton>
      </ToggleButtonGroup>
    </>
  );
};

export default ChatSections;
