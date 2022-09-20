import React, { useEffect, useContext, useState } from 'react'
import ParticipantsTable from './tables/ParticipantsTable'
import ParticipantContext from '../context/ParticipantContext'
import UserContext from '../context/UserContext'
import NewParticipantModal from './modals/NewParticipantModal'

const Participants = () => {
  const { participants, setParticipants } = useContext(ParticipantContext)
  const { roleId } = useContext(UserContext)
  const [error, setError] = useState(null)
  const [componentState, setComponentState] = useState({
    modalOpen: false,
    newParticipantAdded: false
  })
  const [newParticipant, setNewParticipant] = useState({
    username: null,
    password: null,
    phoneNumber: null,
    emailAddress: null,
    address: null,
    gender: null,
    dateOfBirth: null,
    fullName: null,
    role: null
  })
  const handleNewParticipant = async (newParticipant) => {
    setNewParticipant((prevState) => ({
      ...prevState,
      role: participants[0].role
    }))
    try {
      const rawResponse = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/auth/register`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newParticipant)
        }
      )
      const response = await rawResponse.json()
      if (rawResponse.ok && response.user._id) {
        setComponentState((prevState) => ({
          ...prevState,
          modalOpen: false,
          newParticipantAdded: !newParticipant.newParticipantAdded
        }))
        setNewParticipant({
          username: null,
          password: null,
          phoneNumber: null,
          emailAddress: null,
          address: null,
          gender: null,
          dateOfBirth: null,
          fullName: null,
          role: null
        })
      } else {
        setError(response.message)
      }
    } catch (err) {
      setError(err)
      console.log(error)
    }
  }
  const filterByRole = (user) => {
    return user.role !== roleId
  }

  useEffect(() => {
    const fetchData = async () => {
      const rawResponse = await fetch(`${process.env.REACT_APP_BASE_URL}/api/users`, {
        method: 'GET'
      })
      const response = await rawResponse.json()
      setParticipants(response.filter(filterByRole))
    }

    fetchData()
  }, [roleId, componentState.newParticipantAdded])
  return (
    <div className="px-5 min-w-7xl">
      <button
        onClick={() =>
          setComponentState((prevState) => ({
            ...prevState,
            modalOpen: true
          }))
        }
        className="my-2 w-22 inline-flex items-center justify-center px-8 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700"
      >
        New Participant
      </button>
      {componentState.modalOpen && participants && (
        <NewParticipantModal
          setComponentState={setComponentState}
          newParticipant={newParticipant}
          setNewParticipant={setNewParticipant}
          handleNewParticipant={handleNewParticipant}
          error={error}
        />
      )}
      {participants && <ParticipantsTable />}
    </div>
  )
}
export default Participants
