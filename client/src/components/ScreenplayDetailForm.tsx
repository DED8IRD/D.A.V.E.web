// ScreenplayDetailForm.tsx
import React, {
  useContext
} from 'react';
import {
  Grid,
  Typography,
  TextField,
} from '@material-ui/core'


const ScreenplayDetailForm: React.FC = () => {
  return (
    <>
      <Typography variant="h5" align="center" gutterBottom>
        Screenplay Details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField 
            id="title" 
            label="Title" 
            helperText="Default: Untitled"
            fullWidth 
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField 
            id="screenwriter" 
            label="Screenwriter" 
            helperText="Default: Anonymous"
            fullWidth 
          />
        </Grid>
      </Grid>
    </>
  )
}

export default ScreenplayDetailForm;