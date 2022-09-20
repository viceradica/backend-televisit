import React, { useContext, useState, useEffect } from 'react'
import UserContext from '../context/UserContext'
import ParticipantContext from '../context/ParticipantContext'
import AppointmentsTable from './tables/AppointmentsTable'

const Home = () => {
  const { username, roleId, role, user } = useContext(UserContext)
  const { participants, setParticipants } = useContext(ParticipantContext)
  const [appointments, setAppointments] = useState([])
  const [upcomingAppointment, setUpcomingAppointment] = useState(null)
  const [componentState, setComponentState] = useState({
    participantsFetched: false
  })
  const filterByRole = (participant) => {
    return participant.role !== roleId
  }
  const filterByUser = (appointment) => {
    if (role === 'Doctor') {
      return appointment.doctor === user && (appointment.type === 'Scheduled' || appointment.type === 'Rescheduled')
    } else if (role === 'Patient') {
      return appointment.patient === user && (appointment.type === 'Scheduled' || appointment.type === 'Rescheduled')
    }
  }
  const returnMin = (prev, curr) => {
    return prev.visitDate < curr.visitDate ? prev : curr
  }

  useEffect(() => {
    const fetchParticipants = async () => {
      const rawResponse = await fetch(`${process.env.REACT_APP_BASE_URL}/api/users`, {
        method: 'GET'
      })
      const response = await rawResponse.json()
      setParticipants(response.filter(filterByRole))
      setComponentState((prevState) => ({
        ...prevState,
        participantsFetched: true
      }))
    }
    fetchParticipants()
  }, [roleId, componentState.participantsFetched])

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
    if (appointments.length) {
      setUpcomingAppointment(appointments.reduce(returnMin))
    }
  }, [participants])

  return (
    <div className='text-center'>
      {!user && <div className="py-4 px-4 text-lg text-gray-700 bg-white-50 dark:bg-white-700 dark:text-gray-400">
        Please Sign in to see your appointments
      </div>}
      {user && <div className="py-4 px-4 text-lg text-gray-700 bg-white-50 dark:bg-white-700 dark:text-gray-400">
        Hey {username}. Welcome back!
      </div>}
      {upcomingAppointment && (
        <div
        className="px-4 text-lg text-gray-700 bg-white-50 dark:bg-white-700 dark:text-gray-400"
        >
          <div className='flex items-center'>
          Your next appointment:
          </div>
          <div>
            <AppointmentsTable
              appointments={[upcomingAppointment]}
              location="home"
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default Home
