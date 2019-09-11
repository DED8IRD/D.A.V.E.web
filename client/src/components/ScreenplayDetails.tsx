import React from "react";
import {
  Grid,
  Typography,
  Card,
  CardContent,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { ChipList } from "./CharacterForm";
import { State } from "../utils/types";

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    width: "100%",
    marginBottom: theme.spacing(4)
  },
  flex: {
    display: "flex",
    flex: "row wrap",
    justifyContent: "center",
    "& > *": {
      margin: theme.spacing(0.5)
    }
  }
}));

interface GeneratedProps {
  screenplay: State;
}

const ScreenplayDetails: React.FC<GeneratedProps> = ({ screenplay }) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardContent>
        <Grid container className={classes.card} justify="center">
          <Typography variant="h6" align="center" gutterBottom>
            Here is your bot-generated screenplay.
          </Typography>
          <Typography variant="subtitle2" align="center">
            Made with 💖 and hopeful sentience from D.A.V.E.
          </Typography>
        </Grid>
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="screenplay-details"
          >
            <Typography>Details</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid container justify="center">
              <Typography align="center">
                {screenplay.title} by {screenplay.screenwriter}
              </Typography>
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="character-list"
          >
            <Typography>Characters</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid container className={classes.flex}>
              <ChipList chips={screenplay.characters} />
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="source-list"
          >
            <Typography>Sources</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid container className={classes.flex}>
              <ChipList chips={Object.keys(screenplay.sources)} />
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </CardContent>
    </Card>
  );
};
export default ScreenplayDetails;
