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

interface Film {
  title: string;
  path: string;
  genre: string;
}

interface Genre {
  [key: string]: Film[];
}

const SourceForm: React.FC = (props: any) => {
  const [allFilms, setFilms] = useState<Genre>({})
  const [query, setQuery] = useState<string>('')
  const [searchResults, setSearchResults] = useState<Genre>({})

  const getFilms = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/sources/");
      setFilms(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect((): void => {
    if (Object.keys(allFilms).length === 0) getFilms();
  });

  const search = (query: string) => {
    const results: Genre = {}
    if (query) {
      for (const genre in allFilms) {
        const films = allFilms[genre]
        const match: Film[] = []
        for (const film of films) {
          const title = film.title.toLowerCase()
          if (title.includes(query.toLowerCase())) match.push(film) 
        }
        results[genre] = match
      }
      setSearchResults(results)
    }
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setQuery(event.currentTarget.value)
    search(query)
    console.log(query)
  }

  return (
    <React.Fragment>
      <Paper>
        <Input 
          type='search'
          placeholder='Search films'
          inputProps={{ 'aria-label': 'search films' }}
          value={query}
          onChange={handleChange}
          fullWidth              
        />
      </Paper>
      {Object.keys(searchResults).map((genre: string) => (
        searchResults[genre].length ? (
          <FormControl 
            key={genre} 
            fullWidth
          >
            <p>{genre}</p>
            {searchResults[genre].map((film: Film) => (
              <FormControlLabel
                control={<Checkbox value="checkedA" />}
                label={film.title}
                key={film.title}
              />
            ))}
          </FormControl>
        ) : null
      ))}
    </React.Fragment>
  );
};

export default SourceForm;
