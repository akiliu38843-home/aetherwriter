"use client"

import { createContext, useContext, useState, ReactNode } from "react"
import { NarrativeDimensions, DEFAULT_DIMENSIONS } from "@/lib/prompts"

interface NarrativeContextType {
  dimensions: NarrativeDimensions
  setDimensions: (dimensions: NarrativeDimensions) => void
}

const NarrativeContext = createContext<NarrativeContextType | undefined>(undefined)

export function NarrativeProvider({ children }: { children: ReactNode }) {
  const [dimensions, setDimensions] = useState<NarrativeDimensions>(DEFAULT_DIMENSIONS)

  return (
    <NarrativeContext.Provider value={{ dimensions, setDimensions }}>
      {children}
    </NarrativeContext.Provider>
  )
}

export function useNarrative() {
  const context = useContext(NarrativeContext)
  if (!context) {
    throw new Error("useNarrative must be used within NarrativeProvider")
  }
  return context
}
