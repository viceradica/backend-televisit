import React, { useState, useEffect, useContext } from 'react'
import AppointmentsTable from './tables/AppointmentsTable'
import UserContext from '../context/UserContext'
import ParticipantContext from '../context/ParticipantContext'
// import { useNavigate } from 'react-router-dom'
import ScheduleModal from './modals/ScheduleModal'

const Appointments = () => {
  const [appointments, setAppointments] = useState(null)
  const { user, role, roleId } = useContext(UserContext)
  const { setParticipants } = useContext(ParticipantContext)
  const [componentState, setComponentState] = useState({
    modalOpen: false,
    pendingSchedule: false,
    participantsFetched: false
  })
  // const navigate = useNavigate()
  // useEffect(() => {
  //   if (!user) navigate('/')
  // }, [user])
  const [newAppointment, setNewAppointment] = useState({
    type: 'Scheduled',
    date: null,
    time: null,
    patient: null
  })
  const handleSchedule = async (newAppointment) => {
    setComponentState((prevState) => ({
      ...prevState,
      pendingSchedule: true
    }))
    try {
      const rawResponse = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/appointments`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: newAppointment.type,
            visitDate: newAppointment.date + ' ' + newAppointment.time,
            patient: newAppointment.patient,
            doctor: user
          })
        }
      )
      const response = await rawResponse.json()
      if (rawResponse.ok) {
        setAppointments((prevState) => [...prevState, response])
        setComponentState((prevState) => ({
          ...prevState,
          pendingSchedule: false
        }))
        setComponentState((prevState) => ({
          ...prevState,
          modalOpen: false
        }))
      }
    } catch (e) {
      console.log(e)
    }
  }

  const filterByUser = (appointment) => {
    if (role === 'Doctor') {
      return appointment.doctor === user
    } else if (role === 'Patient') {
      return appointment.patient === user
    }
  }
  const filterByRole = (participant) => {
    return participant.role !== roleId
  }

  useEffect(() => {
    const fetchParticipants = async () => {
      const rawResponse = await fetch(`${process.env.REACT_APP_BASE_URL}/api/users`, {
        method: 'GET'
      })
      const response = await rawResponse.json()
      setParticipants(response.filter(filterByRole))
      setComponentState(prevState => ({
        ...prevState,
        participantsFetched: true
      }))
    }
    fetchParticipants()
  }, [roleId])

  useEffect(() => {
    const fetchAppointments = async () => {
      const rawResponse = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/appointments`,
        {
          method: 'GET'
        }
      )
      const response = await rawResponse.json()
      setAppointments(response.filter(filterByUser))
    }
    fetchAppointments()
  }, [componentState.participantsFetched])

  return (
    <div className="px-5 py-4 min-w-7xl">
      <button
        onClick={() =>
          setComponentState((prevState) => ({
            ...prevState,
            modalOpen: true
          }))
        }
        className="my-2 w-22 inline-flex items-center justify-center px-8 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700"
      >
        New Appointment
      </button>
      {componentState.modalOpen && (
        <ScheduleModal
          setComponentState={setComponentState}
          newAppointment={newAppointment}
          setNewAppointment={setNewAppointment}
          handleSchedule={handleSchedule}
        />
      )}
      {appointments && <AppointmentsTable appointments={appointments} />}
    </div>
  )
}

export default Appointments
