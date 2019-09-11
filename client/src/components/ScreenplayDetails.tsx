import React from 'react';
import {
  Grid,
  Typography,
  Card,
  CardContent,
  TextField,
} from "@material-ui/core"
import { makeStyles, Theme } from "@material-ui/core/styles";
import { ChipList } from "./CharacterForm";
import { State } from "../utils/types";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    justify: 'center',
    margin: theme.spacing(1),
    '&>*': {
      margin: theme.spacing(1)    
    }
  },
  card: {
    width: '100%',
    marginBottom: theme.spacing(4)
  },
}));

interface GeneratedProps {
  screenplay: State;
}

const ScreenplayDetails: React.FC<GeneratedProps> = ({ screenplay }) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.card} align='center'>
          <Typography variant='h6' gutterBottom>
            Here is your bot-generated screenplay.
          </Typography>
          <Typography variant='subtitle2'>
          Made with 💖 and hopeful sentience from D.A.V.E.
          </Typography>
        </Typography>
        <Grid container className={classes.root} justify='space-around'>
          <TextField
            value={screenplay.title}
            label='Title'
            variant='outlined'
            disabled
          />
          <TextField
            value={screenplay.screenwriter}
            label='Screenwriter'
            variant='outlined'
            disabled
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant='h6' align='center'>
            Characters
          </Typography>
          <ChipList chips={screenplay.characters} />
        </Grid>
        <Grid item xs={12}>
          <Typography variant='h6' align='center'>
            Sources
          </Typography>
          <ChipList chips={Object.keys(screenplay.sources)} />
        </Grid>          
      </CardContent>
    </Card>
  );
};
export default ScreenplayDetails;