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
export interface ContainerComponentProps {
  children?: React.ReactNode
}

export const ScreenplayFormContext = React.createContext<State>(initialForm)
export const StoreProvider: React.FC = ({ children }: ContainerComponentProps) => {
  return (
    <ScreenplayFormContext.Provider value={initialForm}>
      {children}
    </ScreenplayFormContext.Provider>
  )
}


