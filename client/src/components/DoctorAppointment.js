import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import ParticipantContext from '../context/ParticipantContext'
import UserContext from '../context/UserContext'
import RescheduleModal from './modals/RescheduleModal'

const DoctorAppointment = () => {
  const { appointmentId } = useParams()
  const { roleId } = useContext(UserContext)
  const { participants, setParticipants } = useContext(ParticipantContext)
  const [appointment, setAppointment] = useState(null)
  const [pending, setPending] = useState({
    pendingFinished: false,
    modalOpen: false,
    pendingReschedule: false,
    pendingCancel: false
  })
  /* eslint-disable-next-line */
  const [rescheduleDateTime, setRescheduleDateTime] = useState({
    date: null,
    time: null
  })
  const filterByRole = (user) => {
    return user.role !== roleId
  }
  const findById = (appointment) => {
    const subject = participants.find(
      (participant) => participant._id === appointment.patient
    )
    return subject.emailAddress
  }

  const handleReschedule = async (rescheduleDateTime) => {
    setPending((prevState) => ({
      ...prevState,
      pendingReschedule: true
    }))
    try {
      const rawResponse = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/appointments/${appointmentId}`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            visitDate: rescheduleDateTime.date + ' ' + rescheduleDateTime.time,
            type: 'Rescheduled'
          })
        }
      )
      const response = await rawResponse.json()
      if (rawResponse.status === 200) {
        setAppointment((prevState) => ({
          ...prevState,
          visitDate: response.visitDate,
          type: response.type
        }))
        setPending((prevState) => ({
          ...prevState,
          pendingReschedule: false
        }))
        setPending((prevState) => ({
          ...prevState,
          modalOpen: false
        }))
      }
    } catch (e) {
      console.log(e)
    }
  }
  const handleFinished = async () => {
    setPending((prevState) => ({
      ...prevState,
      pendingFinished: true
    }))
    try {
      const rawResponse = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/appointments/${appointmentId}`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ type: 'Done' })
        }
      )
      const response = await rawResponse.json()
      if (rawResponse.status === 200) {
        setAppointment((prevState) => ({
          ...prevState,
          type: response.type
        }))
        setPending((prevState) => ({
          ...prevState,
          pendingFinished: false
        }))
      }
    } catch (e) {
      console.log(e)
    }
  }
  const handleCancel = async () => {
    setPending((prevState) => ({
      ...prevState,
      pendingCancel: true
    }))
    try {
      const rawResponse = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/appointments/${appointmentId}`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ type: 'Canceled' })
        }
      )
      const response = await rawResponse.json()
      if (rawResponse.status === 200) {
        setAppointment((prevState) => ({
          ...prevState,
          type: response.type
        }))
        setPending((prevState) => ({
          ...prevState,
          pendingCancel: false
        }))
      }
    } catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    const fetchParticipants = async () => {
      const rawResponse = await fetch(`${process.env.REACT_APP_BASE_URL}/api/users`, {
        method: 'GET'
      })
      const response = await rawResponse.json()
      setParticipants(response.filter(filterByRole))
    }

    const fetchAppointment = async () => {
      const rawResponse = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/appointments/${appointmentId}`,
        {
          method: 'GET'
        }
      )
      const response = await rawResponse.json()
      setAppointment(response)
    }
    if (!participants) fetchParticipants()
    if (participants && !appointment) fetchAppointment()
  }, [participants, appointment])

  return (
    <>
      {pending.modalOpen && (
        <RescheduleModal
          setPending={setPending}
          setRescheduleDateTime={setRescheduleDateTime}
          rescheduleDateTime={rescheduleDateTime}
          handleReschedule={handleReschedule}
        />
      )}
      {appointment && (
        <div className="overflow-x-auto shadow-md sm:rounded-lg py-auto">
          <table className="w-full text-sm text-center text-gray-500 dark:text-gray-400">
            <tbody>
              <tr className="bg-white border-b dark:bg-white-800 object-scale-down">
                <th className="px-6 py-4">Type:</th>
                <td className="px-6 py-4">{appointment.type}</td>
                <td className="px-6 py-4">
                  {!pending.pendingFinished && (
                    <button
                      onClick={() => handleFinished()}
                      className="w-22 inline-flex items-center justify-center px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-500 hover:bg-green-600"
                    >
                      Finished
                    </button>
                  )}
                  {pending.pendingFinished && (
                    <button className="disabled w-full inline-flex items-center justify-center px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-500 hover:bg-green-600">
                      Loading
                    </button>
                  )}
                </td>
              </tr>
              <tr className="bg-white border-b dark:bg-white-800">
                <th className="px-6 py-4">Patient:</th>
                <td className="px-6 py-4">{findById(appointment)}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() =>
                      setPending((prevState) => ({
                        ...prevState,
                        modalOpen: true
                      }))
                    }
                    className="w-22 inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-400 hover:bg-amber-500"
                  >
                    Reschedule
                  </button>
                </td>
              </tr>
              <tr className="bg-white dark:bg-white-800">
                <th className="px-6 py-4">Visit Time:</th>
                <td className="px-6 py-4">{appointment.visitDate}</td>
                <td className="px-6 py-4">
                  {!pending.pendingCancel && (
                    <button
                      onClick={() => handleCancel()}
                      className="w-22 inline-flex items-center justify-center px-8 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-500 hover:bg-red-600"
                    >
                      Cancel
                    </button>
                  )}
                  {pending.pendingCancel && (
                    <button className="disabled w-22 inline-flex items-center justify-center px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-500 hover:bg-red-600">
                      Loading
                    </button>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </>
  )
}

export default DoctorAppointment
