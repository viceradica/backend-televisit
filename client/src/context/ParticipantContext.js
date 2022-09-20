import { useState, createContext } from 'react'

const ParticipantContext = createContext()

export function ParticipantProvider ({ children }) {
  const [participants, setParticipants] = useState(null)
  return (
    <ParticipantContext.Provider value={{ participants, setParticipants }} >
        {children}
    </ParticipantContext.Provider>
  )
}

export default ParticipantContext
