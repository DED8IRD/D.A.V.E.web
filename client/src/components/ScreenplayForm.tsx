import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import {
  Paper,
  Grid,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography
} from "@material-ui/core";

import ScreenplayDetailForm from './ScreenplayDetailForm' 
import CharacterForm from './CharacterForm' 
import SourceForm from './SourceForm' 

const useStyles = makeStyles((theme: Theme) => ({
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3)
    }
  },
  stepper: {
    padding: theme.spacing(3, 0, 5)
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end"
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1)
  },
  formControl: {
    margin: theme.spacing(3),
    padding: theme.spacing(3)
  },
  textField: {
    margin: "dense"
  }
}));

const steps = ['Details', 'Characters', 'Sources'];

function getStepContent(step: number) {
  switch (step) {
    case 0:
      return <ScreenplayDetailForm />;
    case 1:
      return <CharacterForm />;
    case 2:
      return <SourceForm />;
    default:
      throw new Error('Unknown step');
  }
}

const ScreenplayForm: React.FC = () => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const handleNext = () => setActiveStep(activeStep + 1)
  const handleBack = () => setActiveStep(activeStep - 1)

  return (
     <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Screenplay Generator
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map(label => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper> 
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Generating your screenplay...
                </Typography>
                <Typography variant="subtitle1">
                  D.A.V.E. is busy writing your screenplay. We will notify you when your files are ready.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button 
                      variant='contained'
                      color='secondary'
                      onClick={handleBack} 
                      className={classes.button}
                    >
                      Back
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? 'Generate' : 'Next'}
                  </Button>
                </div>
              </React.Fragment>
            )}
          </React.Fragment>                 
        </Paper>
      </main>
  );
};

export default ScreenplayForm;
