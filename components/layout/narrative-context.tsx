"use client"

import { createContext, useContext, useState, ReactNode } from "react"
import {
  NarrativeDimensions,
  DEFAULT_DIMENSIONS,
  WritingMode,
  WRITING_MODES
} from "@/lib/prompts"

interface NarrativeContextType {
  dimensions: NarrativeDimensions
  setDimensions: (dimensions: NarrativeDimensions) => void
  selectedMode: WritingMode | null
  setSelectedMode: (mode: WritingMode | null) => void
  applyMode: (mode: WritingMode) => void
  availableModes: WritingMode[]
}

const NarrativeContext = createContext<NarrativeContextType | undefined>(undefined)

export function NarrativeProvider({ children }: { children: ReactNode }) {
  const [dimensions, setDimensions] = useState<NarrativeDimensions>(DEFAULT_DIMENSIONS)
  const [selectedMode, setSelectedMode] = useState<WritingMode | null>(null)

  const applyMode = (mode: WritingMode) => {
    setDimensions(mode.dimensions)
    setSelectedMode(mode)
  }

  return (
    <NarrativeContext.Provider value={{
      dimensions,
      setDimensions,
      selectedMode,
      setSelectedMode,
      applyMode,
      availableModes: WRITING_MODES
    }}>
      {children}
    </NarrativeContext.Provider>
  )
}

export function useNarrative() {
  const context = useContext(NarrativeContext)
  if (!context) {
    throw new Error("useNarrative must be used within a NarrativeProvider")
  }
  return context
}
