import React, { createContext, useReducer, useEffect, useState } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import {
  Paper,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography
} from "@material-ui/core";
import axios from "axios";

import { State, Action, ScreenplayContext, Generated } from "../utils/types";
import { reducer } from "../utils/reducers";
import ScreenplayDetailForm from "./ScreenplayDetailForm";
import CharacterForm from "./CharacterForm";
import SourceForm from "./SourceForm";
import GeneratedScreenplay from "./GeneratedScreenplay";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";

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

const initialForm: State = {
  title: "",
  screenwriter: "",
  characters: [],
  sources: {}
};

export const Context = createContext({
  state: initialForm,
  dispatch: (action: Action) => {}
});

const ScreenplayForm: React.FC = () => {
  const classes = useStyles();
  const [state, dispatch] = useReducer(reducer, initialForm);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [screenplay, setScreenplay] = useState<Generated>({
    ...initialForm,
    generated: {
      pdf: "",
      plaintext: ""
    }  
  });
  const steps = ["Details", "Characters", "Sources"];
  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <ScreenplayDetailForm />;
      case 1:
        return <CharacterForm />;
      case 2:
        return <SourceForm />;
      default:
        throw new Error("Unknown step");
    }
  };
  const handleNext = () => setActiveStep(activeStep + 1);
  const handleBack = () => setActiveStep(activeStep - 1);
  useEffect(() => {
    if (activeStep === steps.length) {
      setSubmitted(true);
    }
  }, [activeStep]);

  const submitForm = async () => {
    setIsLoading(true);
    if (submitted) {
      try {
        const res = await axios.post(
          "http://localhost:8000/screenwrite/",
          state
        );
        console.log(res);
        const data: Generated = res.data;
        setScreenplay(data);
        console.log(screenplay);
      } catch (err) {
        console.log(err);
      }
    }
    setIsLoading(false);
  };

  useEffect((): any => {
    submitForm();
  }, [submitted]);

  return (
    <Context.Provider value={{ state, dispatch }}>
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
          <>
            {activeStep === steps.length ? (
              isLoading ? (
                <>
                  <Typography variant="h5" gutterBottom>
                    Generating your screenplay...
                  </Typography>
                  <Typography variant="subtitle1">
                    D.A.V.E. is busy writing your screenplay. Your files will be
                    available to download when they are ready.
                  </Typography>
                </>
              ) : (
                <GeneratedScreenplay screenplay={screenplay} />
              )
            ) : (
              <>
                {getStepContent(activeStep)}
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button
                      variant="contained"
                      color="secondary"
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
                    {activeStep === steps.length - 1 ? "Generate" : "Next"}
                  </Button>
                </div>
              </>
            )}
          </>
        </Paper>
      </main>
    </Context.Provider>
  );
};

export default ScreenplayForm;
