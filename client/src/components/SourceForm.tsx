// SourceForm.tsx
import React, {
  useState,
  useEffect,
  ChangeEvent,
} from "react";
import axios from "axios";
import {
  Paper,
  FormLabel,
  FormControl,
  FormGroup,
  FormControlLabel,
  FormHelperText,
  Input,
  TextField,
  Checkbox,
  Typography,
  Chip,
} from "@material-ui/core";
import {makeStyles, createStyles, Theme} from "@material-ui/core/styles"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      display: 'flex',
      flexWrap: 'wrap',
      padding: theme.spacing(0.5),
    },
    chip: {
      margin: theme.spacing(0.5),
    },
  }),
);

interface Film {
  path: string;
  genre: string[];
}

interface Films {
  [key: string]: Film;
}

const SourceForm: React.FC = (props: any) => {
  const [films, setFilms] = useState<Films>({})
  const [query, setQuery] = useState<string>('')
  const [searchResults, setSearchResults] = useState<Films>({})

  const getFilms = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/sources/");
      setFilms(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect((): void => {
    if (Object.keys(films).length === 0) getFilms();
  });

  const search = (query: string) => {
    const results: Films = {} 
    if (query) {
      for (const film in films) {
        const title = film.toLowerCase()
        if (title.includes(query.toLowerCase())) {
          results[film] = films[film]
        } 
      }
      setSearchResults(results)
    }
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setQuery(event.currentTarget.value)
    search(query)
    console.log(query)
  }

  const classes = useStyles()

  return (
    <React.Fragment>
      <Paper className={classes.paper}>
        <Input 
          type='search'
          placeholder='Search films'
          inputProps={{ 'aria-label': 'search films' }}
          value={query}
          onChange={handleChange}
          fullWidth              
        />
      </Paper>
      {Object.keys(searchResults).map((film: string) => (
          <FormControl key={film} fullWidth>
            <FormControlLabel
              control={<Checkbox />}
              label={film}
            />
            <Paper>
              {searchResults[film].genre.map((genre, i) => (
                <Chip
                  key={i}
                  label={genre}
                  className={classes.chip}
                />
              ))}
            </Paper>
          </FormControl>
      ))}
    </React.Fragment>
  );
};

export default SourceForm;
