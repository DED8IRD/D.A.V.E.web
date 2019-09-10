// TS Interfaces
// SourceForm
export interface Film {
  title?: string;
  id: number;
  genre: string[];
}

export interface Films {
  [key: string]: Film;
}

// Actions & Reducers
export interface Action {
  readonly type: string;
  readonly [key: string]: any;
}

export interface State {
  title: string;
  screenwriter: string;
  characters: string[];
  sources: Films;
}

export interface ScreenplayContext {
  state: State;
  dispatch: (action: Action) => void;
}

export interface ContainerComponentProps {
  children?: React.ReactNode;
}

// Screenplay gen response
export interface Generated {
  pdf: string,
  plaintext: string
}