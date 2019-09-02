import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import {
  Paper,
  Grid,
  FormLabel,
  FormControl,
  FormGroup,
  FormControlLabel,
  FormHelperText,
  Checkbox,
  TextField,
  Typography,
} from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    formControl: {
      margin: theme.spacing(3),
    },
  }),
);

const CheckboxesGroup: React.FC = () => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    gilad: true,
    jason: false,
    antoine: false,
  });

  const handleChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [name]: event.target.checked });
  };

  const { gilad, jason, antoine } = state;
  const error = [gilad, jason, antoine].filter(v => v).length !== 2;

  return (
    <Grid container alignItems="center" justify="center">
      <Paper>
        <Typography variant="h5" gutterBottom>
          Generate a Screenplay
        </Typography>    
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">Screenplay Details</FormLabel>
         <FormGroup>
           <TextField id="title" label="Title" fullWidth />
           <TextField id="screenwriter" label="Screenwriter" fullWidth />
         </FormGroup>

        </FormControl>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">Assign responsibility</FormLabel>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox checked={gilad} onChange={handleChange('gilad')} value="gilad" />}
              label="Gilad Gray"
            />
            <FormControlLabel
              control={<Checkbox checked={jason} onChange={handleChange('jason')} value="jason" />}
              label="Jason Killian"
            />
            <FormControlLabel
              control={
                <Checkbox checked={antoine} onChange={handleChange('antoine')} value="antoine" />
              }
              label="Antoine Llorca"
            />
          </FormGroup>
          <FormHelperText>Be careful</FormHelperText>
        </FormControl>
        <FormControl required error={error} component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">Pick two</FormLabel>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox checked={gilad} onChange={handleChange('gilad')} value="gilad" />}
              label="Gilad Gray"
            />
            <FormControlLabel
              control={<Checkbox checked={jason} onChange={handleChange('jason')} value="jason" />}
              label="Jason Killian"
            />
            <FormControlLabel
              control={
                <Checkbox checked={antoine} onChange={handleChange('antoine')} value="antoine" />
              }
              label="Antoine Llorca"
            />
          </FormGroup>
          <FormHelperText>You can display an error</FormHelperText>
        </FormControl>
      </Paper>
    </Grid>
  );
}

export default CheckboxesGroup