// ScreenplayFormContext.tsx
import React from 'react'

const initialForm = {
  details: {
    title: '',
    screenwriter: null,
  },
  characters: [],
  sources: {}
}

export const ScreenplayFormContext = React.createContext({})
