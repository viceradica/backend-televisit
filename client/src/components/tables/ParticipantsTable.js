import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import ParticipantContext from '../../context/ParticipantContext'

const ParticipantsTable = () => {
  const { participants } = useContext(ParticipantContext)
  const options = { year: 'numeric', month: 'short', day: 'numeric' }

  const getLocalDate = (date) => {
    return new Date(date).toLocaleDateString(
      'en-UK', options
    )
  }
  return (
    <div className="overflow-x-auto shadow-md sm:rounded-lg py-auto">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-white-50 dark:bg-white-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Full Name
            </th>
            <th scope="col" className="px-6 py-3">
              Username
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Date of birth
            </th>
            <th scope="col" className="px-6 py-3">
              <span className="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {participants &&
            participants.map((participant) => (
              <tr className="bg-white border-b dark:bg-white-800" key={participant._id}>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 dark:text-gray-400 whitespace-nowrap">
                  {participant.fullName}
                </th>
                <td className="px-6 py-4">{participant.username}</td>
                <td className="px-6 py-4">{participant.emailAddress}</td>
                <td className="px-6 py-4">{getLocalDate(participant.dateOfBirth)}</td>
                <td className="px-6 py-4 text-right">
                  <Link to={participant._id} className="text-cyan-600">
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

export default ParticipantsTable
