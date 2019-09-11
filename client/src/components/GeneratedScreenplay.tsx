import React from "react";
import { Grid, ButtonGroup, Button } from "@material-ui/core";
import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";
import DescriptionIcon from "@material-ui/icons/Description";
import { makeStyles, Theme } from "@material-ui/core/styles";

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
  pdf: string;
  txt: string;
}

const GeneratedScreenplay: React.FC<GeneratedProps> = ({ pdf, txt }) => {
  const classes = useStyles()

  return (
    <Grid container justify='center'>
      <Grid item xs={12}>
        <ButtonGroup color='primary' aria-label="download screenplay button group" fullWidth>
          <Button
            target='_blank'
            href={pdf}
            aria-label='download screenplay as pdf'
            variant='contained' 
          >
            PDF
            <PictureAsPdfIcon className={classes.icon} />
          </Button>
          <Button
            target='_blank'
            href={txt}
            aria-label='download screenplay as plaintext'
          >
            TXT
            <DescriptionIcon className={classes.icon} />
          </Button>
        </ButtonGroup>
      </Grid>
      <Grid item xs={12}>
        <object data={pdf} type="application/pdf" className={classes.pdf}>
          <embed src={pdf} type="application/pdf" className={classes.pdf} />
        </object>
      </Grid>
    </Grid>
  );
};

export default GeneratedScreenplay;
