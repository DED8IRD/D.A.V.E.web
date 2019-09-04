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
  [key: string]: Film[]
}

const SourceForm: React.FC = (props: any) => {
  const [films, setFilms] = React.useState<Genre>({})
  const getFilms = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/sources/')
      setFilms(response.data)
    } catch (err) {
      console.log(err)
    }
  }
  React.useEffect(() => {
    if (Object.keys(films).length === 0) getFilms()
  })

  return (
    <React.Fragment>
        {Object.keys(films).map((genre: string) => {
          return (
            <FormControl key={genre}>
              <p>{genre}</p>
              {
                films[genre].map((film: Film) => (
                    <FormControlLabel
                      control={
                        <Checkbox value="checkedA" />
                      }
                      label={film.title}
                      key={film.title}
                    />          
                  )
                )
              }
            </FormControl>
          )
        })}
    </React.Fragment>
  )
}

export default SourceForm;