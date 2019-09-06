// ScreenplayFormContext.tsx
import React, {
  createContext,
  useReducer
} from 'react'
import {reducer} from './reducers'

export const initialForm = {
  details: {
    title: '',
    screenwriter: '',
  },
  characters: [],
  sources: {}
}

export type State = typeof initialForm

export const ScreenplayFormContext = React.createContext<any>(initialForm)

export const StoreProvider: React.FC<any> = ({ children }) => {
  return (
    <ScreenplayFormContext.Provider value={initialForm}>
      {children}
    </ScreenplayFormContext.Provider>
  )
}


