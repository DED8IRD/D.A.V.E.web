// TS Interfaces

// CharacterForm
export interface CharacterChipProps {
  chips: string[], 
  handleDelete: (index: number) => any
}

// SourceForm
export interface Film {
  title?: string;
  path: string;
  genre: string[];
}

export interface Films {
  [key: string]: Film;
}

export interface SelectedFilm {
  film: Film,
  checked: boolean
}

export interface SelectedFilms {
  [key: string]: SelectedFilm
}

