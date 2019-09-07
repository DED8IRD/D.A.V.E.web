// ScreenplayDetailForm.tsx
import React, { useContext, ChangeEvent } from "react";
import { Grid, Typography, TextField } from "@material-ui/core";
import { Context } from "./ScreenplayForm";
import { setTitle, setAuthor } from "../utils/reducers";

const ScreenplayDetailForm: React.FC = () => {
  const { state, dispatch } = useContext(Context);
  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setTitle(event.currentTarget.value));
  };
  const handleAuthorChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setAuthor(event.currentTarget.value));
  };

  return (
    <>
      <Typography variant="h5" align="center" gutterBottom>
        Screenplay Details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            onChange={handleTitleChange}
            value={state.title}
            id="title"
            label="Title"
            helperText="Default: Untitled"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            onChange={handleAuthorChange}
            value={state.screenwriter}
            id="screenwriter"
            label="Screenwriter"
            helperText="Default: Anonymous"
            fullWidth
          />
        </Grid>
      </Grid>
    </>
  );
};

export default ScreenplayDetailForm;
