// Reducers
import { State, Action, Film, Films } from "./types";

// ACTIONS
export const SET_TITLE = "SET_TITLE";
export const SET_AUTHOR = "SET_AUTHOR";
export const ADD_CHARACTER = "ADD_CHARACTER";
export const REMOVE_CHARACTER = "REMOVE_CHARACTER";
export const ADD_SOURCE = "ADD_SOURCE";
export const REMOVE_SOURCE = "REMOVE_SOURCE";

// ACTION CREATORS
export const setTitle = (title: string): Action => ({
  type: SET_TITLE,
  title
});
export const setAuthor = (screenwriter: string): Action => ({
  type: SET_AUTHOR,
  screenwriter
});
export const addCharacter = (character: string): Action => ({
  type: ADD_CHARACTER,
  character
});
export const removeCharacter = (idx: number): Action => ({
  type: REMOVE_CHARACTER,
  idx
});
export const addSource = (source: Film): Action => ({
  type: ADD_SOURCE,
  source
});
export const removeSource = (title: string): Action => ({
  type: REMOVE_SOURCE,
  title
});

// REDUCERS
export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case SET_TITLE:
      return { ...state, title: action.title };
    case SET_AUTHOR:
      return { ...state, screenwriter: action.screenwriter };
    case ADD_CHARACTER:
      return { ...state, characters: [...state.characters, action.character] };
    case REMOVE_CHARACTER:
      return {
        ...state,
        characters: state.characters.filter(
          (char: string, i: number) => i !== action.idx
        )
      };
    case ADD_SOURCE:
      return {
        ...state,
        sources: { ...state.sources, [action.source.title]: action.source }
      };
    case REMOVE_SOURCE:
      const copy: Films = { ...state.sources };
      delete copy[action.title];
      return { ...state, sources: copy };
    default:
      return state;
  }
};
