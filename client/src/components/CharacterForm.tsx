// CharacterForm.tsx
import React, {
  ChangeEvent,
  FormEvent,
} from 'react';
import {
  Grid,
  TextField,
  InputAdornment,
  IconButton,  
  Typography,
  Chip, 
  Paper
} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import DeleteIcon from '@material-ui/icons/Delete';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

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

interface CharacterChip {
  key: number;
  label: string;
}

interface CharacterChipProps {
  chipList: CharacterChip[], 
  handleDelete: (chipsToDelete: CharacterChip) => any
}

const CharacterChips = ({chipList, handleDelete}: CharacterChipProps) => {
  return (
    <Paper>
      {chipList.map((chip: CharacterChip) => (
          <Chip
            key={chip.key}
            label={chip.label}
            onDelete={handleDelete(chip)}
          />
        )
      )}
    </Paper>
  );
}

const CharacterForm: React.FC = () => {
  const [chips, setChips] = React.useState<CharacterChip[]>([
    {key: 0, label: 'test'},
    {key: 1, label: 'one'},
    {key: 2, label: 'two'},
  ]);
  const [character, setCharacter] = React.useState<string>('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setCharacter(event.currentTarget.value)
  }

  const handleAdd = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    const chip: CharacterChip = {key: chips.length, label: character}
    console.log(chips, chip, [...chips, chip])
    setChips(chipList => [...chipList, chip])
    console.log(chips)
    setCharacter('')
  }

  const handleDelete = (chipToDelete: CharacterChip): void => {
    setChips(chips => chips.filter(chip => chip.key !== chipToDelete.key));
  };

  return (
    <React.Fragment>
      <Typography variant="h5" align="center" gutterBottom>
        Add characters
      </Typography>
        <form onSubmit={handleAdd}>     
            <TextField 
              id="character" 
              name='character'
              label="Characters" 
              value={character}
              onChange={handleChange}
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton type='submit' aria-label="add">
                      <AddIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}              
            />
        </form>
        <CharacterChips 
          chipList={chips}
          handleDelete={handleDelete}
        />
    </React.Fragment>
  )
}



export default CharacterForm;