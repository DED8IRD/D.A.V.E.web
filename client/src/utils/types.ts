// TS Interfaces

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
export interface ScreenplayDetails {
    title: string,
    screenwriter: string
}

// Reducers
export type Reducer<S, A> = (prevState: S, action: A) => S;

export interface Action {
  readonly type: string,
  readonly [key: string]: any
}

