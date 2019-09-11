import React from "react";
import { Grid, Typography, ButtonGroup, Button } from "@material-ui/core";
import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";
import DescriptionIcon from "@material-ui/icons/Description";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Generated } from '../utils/types'

const useStyles = makeStyles((theme: Theme) => ({
  icon: {
    marginLeft: theme.spacing(1)
  },
  pdf: {
    width: '100%',
    height: '100vh',
  }
}))

interface GeneratedProps {
  screenplay: Generated
}

const GeneratedScreenplay: React.FC<GeneratedProps> = ({ screenplay }) => {
  const classes = useStyles()

  return (
    <Grid container justify='center'>
      <Grid item xs={12}>
        <ButtonGroup color='primary' aria-label="download screenplay button group" fullWidth>
          <Button
            target='_blank'
            href={screenplay.generated.pdf}
            aria-label='download screenplay as pdf'
            variant='contained' 
          >
            PDF
            <PictureAsPdfIcon className={classes.icon} />
          </Button>
          <Button
            target='_blank'
            href={screenplay.generated.plaintext}
            aria-label='download screenplay as plaintext'
          >
            TXT
            <DescriptionIcon className={classes.icon} />
          </Button>
        </ButtonGroup>
      </Grid>
      <Grid item xs={12}>
        <object data={screenplay.generated.pdf} type="application/pdf" className={classes.pdf}>
          <embed src={screenplay.generated.pdf} type="application/pdf" className={classes.pdf} />
        </object>
      </Grid>
    </Grid>
  );
};

export default GeneratedScreenplay;
