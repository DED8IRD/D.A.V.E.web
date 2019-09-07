// Reducers
import {State} from './contexts'
import {Action, Reducer, Film, Films} from './types'

// ACTIONS
export const ADD_CHARACTER = 'ADD_CHARACTER'
export const REMOVE_CHARACTER = 'REMOVE_CHARACTER'
export const ADD_SOURCE = 'ADD_SOURCE'
export const REMOVE_SOURCE = 'REMOVE_SOURCE'

// ACTION CREATORS
export const addCharacter = (character: string): Action => ({
  type: ADD_CHARACTER,
  character
})
export const removeCharacter = (idx: number): Action => ({
  type: REMOVE_CHARACTER,
  idx
}) 
export const addSource = (source: Film): Action => ({
  type: ADD_SOURCE,
  source
}) 
export const removeSource = (title: string): Action => ({
  type: REMOVE_SOURCE,
  title
}) 

// REDUCERS
export const reducer = (state: Partial<State>, action: Action) =>{
  switch (action.type) {
    case ADD_CHARACTER:
      return {characters: [...state.characters, action.character]}
    case REMOVE_CHARACTER:
      return {characters: state.characters.filter((char: string, i: number) => i !== action.idx)}
    case ADD_SOURCE:
      return {sources: {...state.sources, [action.source.title]: action.source}}        
    case REMOVE_SOURCE:
      const copy: Films = {...state.sources}
      delete copy[action.title]
      return {sources: copy}        
    default:
      return state
  }
}