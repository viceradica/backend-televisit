import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

const Participant = () => {
  const { userId } = useParams()
  const [participant, setParticipant] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const rawResponse = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/users/${userId}`,
        {
          method: 'GET'
        }
      )
      const response = await rawResponse.json()
      setParticipant(response)
    }

    if (!participant) fetchData()
  }, [])

  return (
    <>
      {participant && (
        <div className="overflow-x-auto shadow-md sm:rounded-lg py-auto">
          <table className="w-full text-sm text-center text-gray-500 dark:text-gray-400">
            <tbody>
              <tr className="bg-white border-b dark:bg-white-800 object-scale-down">
                <th className="px-6 py-4">Full Name:</th>
                <td className="px-6 py-4">{participant.fullName}</td>
              </tr>
              <tr className="bg-white border-b dark:bg-white-800">
                <th className="px-6 py-4">Username:</th>
                <td className="px-6 py-4">{participant.username}</td>
              </tr>
              <tr className="bg-white border-b dark:bg-white-800">
                <th className="px-6 py-4">Email Address:</th>
                <td className="px-6 py-4">{participant.emailAddress}</td>
              </tr>
              <tr className="bg-white border-b dark:bg-white-800">
                <th className="px-6 py-4">Phone Number:</th>
                <td pattern="+[0-9]{3}-[0-9]{4}-[0-9]{3}" className="px-6 py-4">
                  {participant.phoneNumber}
                </td>
              </tr>
              <tr className="bg-white dark:bg-white-800">
                <th className="px-6 py-4">Role:</th>
                <td className="px-6 py-4">Participant</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </>
  )
}

export default Participant
