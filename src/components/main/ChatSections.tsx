import { useState } from "react";
import { makeStyles, ToggleButton, ToggleButtonGroup } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  toggleRoot: {
    padding: 7,
    height: 30,
    width: "100%",
    margin: "7px 0",
    fontSize: "1rem",
    color: "white",
  },
  label: {
    height: "inherit",
  },
  group: {
    marginTop: theme.spacing(5),
    width: "100%",
  },
  selected: {
    color: "white !important",
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
            selected: classes.selected,
          }}
          value="main"
        >
          <h6> main </h6>
        </ToggleButton>
        <ToggleButton
          classes={{
            root: classes.toggleRoot,
            label: classes.label,
            selected: classes.selected,
          }}
          value="new stuff"
        >
          <h6> new stuff </h6>
        </ToggleButton>
        <ToggleButton
          classes={{
            root: classes.toggleRoot,
            label: classes.label,
            selected: classes.selected,
          }}
          value="other"
          aria-label="other"
        >
          <h6> other </h6>
        </ToggleButton>
      </ToggleButtonGroup>
    </>
  );
};

export default ChatSections;
