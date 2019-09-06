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
import {
  Film,
  Films,
  SelectedFilm,
  SelectedFilms
} from './types'

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


const SourceForm: React.FC = (props: any) => {
  const [films, setFilms] = useState<Films>({})
  const [searchResults, setSearchResults] = useState<Films>({})
  const [selected, setSelected] = useState<SelectedFilms>({})
  const [error, setError] = useState<boolean>(false)

  const getFilms = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/sources/");
      setFilms(films => response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect((): void => {
    if (Object.keys(films).length === 0) getFilms();
  });

  useEffect((): void => {
    const size = Object.keys(selected).length
    setError(err => 5 < size || size < 1)
  })

  const search = (query: string) => {
    const results: Films = {} 
    if (query) {
      for (const film in films) {
        const title = film.toLowerCase()
        if (title.includes(query.toLowerCase())) {
          results[film] = films[film]
        } 
      }
      setSearchResults(searchResults => results)
    }
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    search(event.currentTarget.value)
  }

  const handleDelete = (title: string) => () => {
    const copy = {...selected}
    delete copy[title]
    setSelected(selected => copy) 
  };

  const handleSelect = (event: ChangeEvent<HTMLInputElement>): void => {
    const title: string = event.currentTarget.value
    const checked = (selected[title] ? selected[title].checked : false) 
    if (!checked) {
      const film: SelectedFilm = {
        film: {...searchResults[title], title},
        checked: true
      }
      setSelected(selected => ({...selected, [title]: film}))
    } else {
      const copy = {...selected}
      delete copy[title]
      setSelected(selected => copy)   
    }
  }

  const classes = useStyles()

  return (
    <React.Fragment>
      <Paper className={classes.paper}>
        <Input 
          type='search'
          placeholder='Search films'
          inputProps={{ 'aria-label': 'search films' }}
          onChange={handleChange}
          fullWidth              
        />
      </Paper>
      <Paper className={classes.paper}>
        {Object.keys(selected).map((title: string) => (
          <Chip 
            key={title}
            label={title}
            onDelete={handleDelete(title)}
          />
        ))}
      </Paper>
      <FormControl 
        error={error} 
        component="fieldset"              
        required
        fullWidth
      >
        <FormHelperText>Choose from one to five screenplays.</FormHelperText>      
        {Object.keys(searchResults).map((film: string) => (
            <FormControl key={film} fullWidth>
              <FormControlLabel
                control={
                  <Checkbox 
                    checked={(selected[film] ? selected[film].checked : false)}
                    onChange={handleSelect}
                    value={film}
                  />
                }
                label={film}
              />
              <Paper>
                {searchResults[film].genre.join(', ')}
              </Paper>
            </FormControl>
        ))}
      </FormControl>
    </React.Fragment>
  );
};

export default SourceForm;
