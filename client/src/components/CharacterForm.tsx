// CharacterForm.tsx
import React, {
  useContext,
  useState,
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
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import {Context} from './ScreenplayForm'
import {addCharacter, removeCharacter} from '../utils/reducers'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      padding: theme.spacing(0.5),
      margin: theme.spacing(3)
    },
    chip: {
      margin: theme.spacing(0.5),
    },
  }),
);

interface CharacterChipProps {
  chips: string[], 
  handleDelete: (index: number) => any,
  children?: React.ReactNode
}

const CharacterChipArray: React.FC<CharacterChipProps> = ({chips, handleDelete}) => {
  const classes = useStyles();
  return (
    <Paper className={classes.paper}>
      {chips.map((chip: string, i: number) => {
        return (
          <Chip
            key={i}
            label={chip}
            onDelete={handleDelete(i)}
            className={classes.chip}
          />
        );
      })}
    </Paper>
  );
}

const CharacterForm: React.FC = () => {
  const {state, dispatch} = useContext(Context)
  const [character, setCharacter] = useState<string>('')

  const handleDelete = (index: number) => () => {
    dispatch(removeCharacter(index))
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setCharacter(event.currentTarget.value)
  }

  const handleAdd = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    dispatch(addCharacter(character))
    setCharacter('')
  }

  return (
    <>
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
      {state.characters.length > 0 && 
        <CharacterChipArray 
          chips={state.characters}
          handleDelete={handleDelete}
        />
      }
    </>
  )
}



export default CharacterForm;