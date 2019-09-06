// TS Interfaces

const initialForm = {
  details: {
    title: '',
    screenwriter: '',
  },
  characters: [],
  sources: {}
}

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

// ScreenplayForm
interface ScreenplayDetails {
    title: string,
    screenwriter: string
}

export interface ScreenplayFormState {
    details: ScreenplayDetails,
    characters: string[],
    sources: Films
}

