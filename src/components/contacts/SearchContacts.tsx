import { IconButton, InputBase, makeStyles } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { ChangeEvent, FormEvent, useState } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "7px 4px",
    display: "flex",
    alignItems: "center",
    width: "100%",
    height: "fit-content",
    marginTop: "auto",
  },
  input: {
    flex: 1,
    padding: "0 5px",
  },
  iconButton: {
    padding: 5,
    backgroundColor: theme.palette.bg.main,
    borderRadius: 5,
    "&:hover": {
      backgroundColor: theme.palette.bg.main,
    },
  },
  divider: {
    height: 28,
    margin: 2,
  },
  iconColor: {
    color: theme.palette.primary.light,
  },
}));

const SearchContacts = () => {
  const classes = useStyles();

  const [search, setSearch] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const submitMessage = (e: FormEvent) => {
    e.preventDefault();
    setSearch("");
  };
  return (
    <form onSubmit={submitMessage} className={classes.root}>
      <InputBase
        value={search}
        name="user"
        aria-label="search for a contact"
        onChange={handleChange}
        placeholder="username..."
        autoComplete="off"
        className={classes.input}
      />
      <IconButton type="submit" className={classes.iconButton}>
        <SearchIcon classes={{ root: classes.iconColor }} />
      </IconButton>
    </form>
  );
};

export default SearchContacts;
