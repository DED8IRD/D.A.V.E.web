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

const SourceForm: React.FC = (props: any) => {
  const [films, setFilms] = React.useState([])
  React.useEffect(() => {
    if (films.length === 0) {
      (async () => {
        try {
          const response = await axios.get('http://localhost:8000/api/sources/')
          setFilms(response.data)
        } catch (err) {
          console.log(err)
        }
      })()
    }
  })

  return (
    <React.Fragment>
        
    </React.Fragment>
  )
}

export default SourceForm;