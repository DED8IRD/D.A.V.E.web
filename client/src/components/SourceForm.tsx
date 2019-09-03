// SourceForm.tsx
import React from 'react';
import axios from 'axios'
import {
  FormLabel,
  FormControl,
  FormGroup,
  FormControlLabel,
  FormHelperText,
  TextField,
  Checkbox,
  Typography,
  Chip
} from '@material-ui/core'

interface Film {
  title: string,
  path: string,
  genre: string
}

interface Genre {
  genre: string,
  films: Film[]
}

const SourceForm: React.FC = (props: any) => {
  const [films, setFilms] = React.useState<Genre[]>([])
  const getFilms = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/sources/')
      setFilms(response.data)
    } catch (err) {
      console.log(err)
    }
  }
  React.useEffect(() => {
    if (films.length === 0) getFilms()
  })

  return (
    <React.Fragment>
        {films.map(genre => {
          console.log(genre)
          return (
            <FormControl>
              <p>{genre.genre}</p>
              {
                genre.films.map(film => {
                  return (
                    <FormControlLabel
                      control={
                        <Checkbox value="checkedA" />
                      }
                      label={film.title}
                    />          
                  )
                })
              }
            </FormControl>
          )
        })}
    </React.Fragment>
  )
}

export default SourceForm;