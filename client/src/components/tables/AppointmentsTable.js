import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import ParticipantContext from '../../context/ParticipantContext'
const AppointmentsTable = (props) => {
  const { participants } = useContext(ParticipantContext)
  const [appointments, setAppointments] = useState([])
  const findById = (appointment) => {
    const subject = participants.find((participant) => participant._id === appointment.patient)
    return subject.emailAddress
  }

  const options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' }

  const getLocalDate = (date) => {
    return new Date(date).toLocaleString(
      'en-UK', options
    )
  }
  useEffect(() => {
    setAppointments(props.appointments)
  }, [props])

  return (
    <div className="overflow-x-auto shadow-md sm:rounded-lg py-auto">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-white-50 dark:bg-white-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Visit Date
            </th>
            <th scope="col" className="px-6 py-3">
              Type
            </th>
            <th scope="col" className="px-6 py-3">
              Televisit with
            </th>
            <th scope="col" className="px-6 py-3">
              <span className="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {appointments &&
            appointments.map((appointment) => (
              <tr
                className="bg-white border-b dark:bg-white-800"
                key={appointment._id}
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 dark:text-gray-400 whitespace-nowrap"
                >
                  {getLocalDate(appointment.visitDate)}
                </th>
                <td className="px-6 py-4">{appointment.type}</td>
                <td className="px-6 py-4">{findById(appointment)}</td>
                <td className="px-6 py-4 text-right">
                  <Link to={props.location === 'home' ? `/appointments/${appointment._id}` : appointment._id} className="text-cyan-600">
                    View
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default AppointmentsTable
