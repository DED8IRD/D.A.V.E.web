// CharacterForm.tsx
import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {
  FormLabel,
  FormControl,
  FormGroup,
  FormControlLabel,
  FormHelperText,
  TextField,  
  Typography,
  Chip, 
  Paper
} from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      padding: theme.spacing(0.5),
    },
    chip: {
      margin: theme.spacing(0.5),
    },
  }),
);

interface ChipData {
  key: number;
  label: string;
}

interface ChipProps {
  chipData: ChipData[], 
  handleDelete: (chipsToDelete: ChipData) => any // fix
}

const ChipsArray = (props: ChipProps) => {
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      {props.chipData.map((data: ChipData) => {
        return (
          <Chip
            key={data.key}
            label={data.label}
            onDelete={props.handleDelete(data)}
            className={classes.chip}
          />
        );
      })}
    </Paper>
  );
}


const CharacterForm: React.FC = () => {
  const [chipData, setChipData] = React.useState<ChipData[]>([
    { key: 0, label: 'Angular' },
    { key: 1, label: 'jQuery' },
    { key: 2, label: 'Polymer' },
    { key: 3, label: 'React' },
    { key: 4, label: 'Vue.js' },
  ]);

  const handleDelete = (chipToDelete: ChipData) => () => {
    setChipData(chips => chips.filter(chip => chip.key !== chipToDelete.key));
  };

  return (
    <React.Fragment>
      <FormControl component="fieldset">  
        <FormGroup>
          <TextField id="characters" label="Characters" />
        </FormGroup>
      </FormControl>
      {chipData && 
        <ChipsArray 
          chipData={chipData}
          handleDelete={handleDelete}
        />
      }
    </React.Fragment>
  )
}



export default CharacterForm;