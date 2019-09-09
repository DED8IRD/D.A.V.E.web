// SourceForm.tsx
import React, { useContext, useState, useEffect, ChangeEvent } from "react";
import axios from "axios";
import {
  Paper,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Input,
  InputBase,
  IconButton,
  Checkbox,
  Typography,
  Chip
} from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search'
import MenuIcon from '@material-ui/icons/Menu'
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

import { Film, Films } from "../utils/types";
import { Context } from "./ScreenplayForm";
import { addSource, removeSource } from "../utils/reducers";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    search: {
      marginLeft: theme.spacing(1),
      flex: 1
    },
    paper: {
      display: "flex",
      flexWrap: "wrap",
      padding: theme.spacing(0.5)
    },
    chip: {
      margin: theme.spacing(0.5)
    }
  })
);

const SourceForm: React.FC = () => {
  const [films, setFilms] = useState<Films>({});
  const [searchResults, setSearchResults] = useState<Films>({});
  const [error, setError] = useState<boolean>(false);
  const { state, dispatch } = useContext(Context);

  const getFilms = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/sources/");
      setFilms(films => response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect((): void => {
    getFilms();
  }, []);

  useEffect((): void => {
    const size = Object.keys(state.sources).length;
    setError(err => 20 < size || size < 3);
  }, [state.sources]);

  const search = (query: string) => {
    const results: Films = {};
    if (query) {
      for (const film in films) {
        const title = film.toLowerCase();
        if (title.includes(query.toLowerCase())) {
          results[film] = films[film];
        }
      }
      setSearchResults(searchResults => results);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    search(event.currentTarget.value);
  };

  const handleDelete = (title: string) => () => {
    dispatch(removeSource(title));
  };

  const handleSelect = (event: ChangeEvent<HTMLInputElement>): void => {
    const title: string = event.currentTarget.value;
    if (!state.sources[title]) {
      const film: Film = { ...searchResults[title], title };
      dispatch(addSource(film));
    } else {
      dispatch(removeSource(title));
    }
  };

  const classes = useStyles();

  return (
    <>
      <Paper className={classes.paper}>
        <IconButton aria-label="menu">
          <MenuIcon />
        </IconButton>
        <InputBase
          className={classes.search}
          placeholder="Search films"
          inputProps={{ 'aria-label': 'search films' }}
          onChange={handleChange}
          fullWidth          
        />
        <IconButton aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
      <Typography variant={'subtitle2'} align='center'>or</Typography>
      <Paper>
        <Input
          type="file"
          inputProps={{ "aria-label": "upload screenplays" }}
          fullWidth
        />
      </Paper>
      {state.sources.length && (
        <Paper className={classes.paper}>
          {Object.keys(state.sources).map((title: string) => (
            <Chip key={title} label={title} onDelete={handleDelete(title)} />
          ))}
        </Paper>
      )}
      <FormControl error={error} component="fieldset" required fullWidth>
        <FormHelperText>Choose 3 to 20 screenplays.</FormHelperText>
        {Object.keys(searchResults).map((film: string) => (
          <FormControl key={film} fullWidth>
            <FormControlLabel
              control={
                <Checkbox
                  checked={Boolean(state.sources[film])}
                  onChange={handleSelect}
                  value={film}
                />
              }
              label={film}
            />
            <Paper>{searchResults[film].genre.join(", ")}</Paper>
          </FormControl>
        ))}
      </FormControl>
    </>
  );
};

export default SourceForm;
