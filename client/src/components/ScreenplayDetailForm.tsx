// ScreenplayDetailForm.tsx
import React from 'react';
import {
  Grid,
  Typography,
  TextField,  
} from '@material-ui/core'


const ScreenplayDetailForm: React.FC = () => {
  return (
    <React.Fragment>
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
    </React.Fragment>
  )
}

export default ScreenplayDetailForm;