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

// ScreenplayForm
interface ScreenplayDetails {
    title: string,
    screenwriter: string
}

// export interface ScreenplayFormState {
//     details: ScreenplayDetails,
//     characters: string[],
//     sources: Films
// }

// Reducers
export type Reducer<S, A> = (prevState: S, action: A) => S;

export interface Action {
  readonly type: string,
  readonly [key: string]: any
}

