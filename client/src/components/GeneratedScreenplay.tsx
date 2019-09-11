import React from "react";
import {
  Grid,
  ButtonGroup,
  Button
} from "@material-ui/core";
import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";
import DescriptionIcon from "@material-ui/icons/Description";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Generated } from "../utils/types";
import ScreenplayDetails from "./ScreenplayDetails";

const useStyles = makeStyles((theme: Theme) => ({
  icon: {
    marginLeft: theme.spacing(1)
  },
  pdf: {
    width: "100%",
    height: "100vh"
  }
}));

interface GeneratedProps {
  screenplay: Generated;
}

const GeneratedScreenplay: React.FC<GeneratedProps> = ({ screenplay }) => {
  const classes = useStyles();
  screenplay = {
    title: "Star Wars",
    screenwriter: "Jorge Luke Us",
    characters: ["Jar Jar Binks", "Jabba the Hut", "Tony #1", "Tony #2", "Tony #3", "Tony #4", "Tony #5", "Tony #6", ],
    sources: {
      "Star Wars A New Hope": {
        genre: ["Action", "Fantasy", "Sci-Fi"],
        id: 3320,
        title: "Star Wars A New Hope"
      },
      "Star Wars Attack of the Clones": {
        genre: ["Action", "Fantasy", "Sci-Fi"],
        id: 3321,
        title: "Star Wars Attack of the Clones"
      },
      "Star Wars Return of the Jedi": {
        genre: ["Action", "Fantasy", "Sci-Fi"],
        id: 3322,
        title: "Star Wars Return of the Jedi"
      },
      "Star Wars Revenge of the Sith": {
        genre: [
          "Action",
          "Comedy",
          "Crime",
          "Drama",
          "Family",
          "Fantasy",
          "Horror",
          "Mystery",
          "Romance",
          "Sci-Fi",
          "Thriller",
          "Western"
        ],
        id: 3323,
        title: "Star Wars Revenge of the Sith"
      },
      "Star Wars The Empire Strikes Back": {
        genre: ["Action", "Fantasy", "Sci-Fi"],
        id: 3324,
        title: "Star Wars The Empire Strikes Back"
      },
      "Star Wars The Force Awakens": {
        genre: [
          "Action",
          "Comedy",
          "Crime",
          "Drama",
          "Family",
          "Fantasy",
          "Horror",
          "Mystery",
          "Romance",
          "Sci-Fi",
          "Thriller",
          "Western"
        ],
        id: 3325,
        title: "Star Wars The Force Awakens"
      },
      "Star Wars The Phantom Menace": {
        genre: ["Action", "Fantasy", "Sci-Fi"],
        id: 3326,
        title: "Star Wars The Phantom Menace"
      }
    },
    generated: {
      pdf: "http://localhost:8000/media/gen/temp/Star%20Wars.txt",
      plaintext: "http://localhost:8000/media/gen/temp/Star%20Wars.txt"
    }
  };

  return (
    <Grid container>
      <ScreenplayDetails screenplay={screenplay} />
      <Grid item xs={12}>
        <ButtonGroup
          color="primary"
          aria-label="download screenplay button group"
          fullWidth
        >
          <Button
            target="_blank"
            href={screenplay.generated.pdf}
            aria-label="download screenplay as pdf"
            variant="contained"
          >
            PDF
            <PictureAsPdfIcon className={classes.icon} />
          </Button>
          <Button
            target="_blank"
            href={screenplay.generated.plaintext}
            aria-label="download screenplay as plaintext"
          >
            TXT
            <DescriptionIcon className={classes.icon} />
          </Button>
        </ButtonGroup>
      </Grid>
      <Grid item xs={12}>
        <object
          data={screenplay.generated.pdf}
          type="application/pdf"
          className={classes.pdf}
        >
          <embed
            src={screenplay.generated.pdf}
            type="application/pdf"
            className={classes.pdf}
          />
        </object>
      </Grid>
    </Grid>
  );
};

export default GeneratedScreenplay;
