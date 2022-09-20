import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import UserContext from '../context/UserContext'
import EditCurrentUserModal from './modals/EditCurrentUserModal'

const Profile = () => {
  const { role } = useContext(UserContext)
  const { userId } = useParams()
  /* eslint-disable-next-line */
  const [user, setUser] = useState({
    fullName: null,
    username: null,
    dateOfBirth: null,
    gender: null,
    address: null,
    emailAddress: null,
    phoneNumber: null
  })
  const [componentState, setComponentState] = useState({
    pending: false,
    modalOpen: false
  })

  const handleEditUser = async (editedUser) => {
    try {
      const rawResponse = await fetch(
      `${process.env.REACT_APP_BASE_URL}/api/users/${userId}`,
      {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editedUser)
      }
      )
      const response = await rawResponse.json()
      if (rawResponse.status === 200) {
        console.log(response)
        setUser(editedUser)
        setComponentState(prevState => ({
          ...prevState,
          modalOpen: false
        }))
      }
    } catch (error) {

    }
  }

  useEffect(() => {
    const fetchUser = async () => {
      setComponentState(prevState => ({
        ...prevState,
        pending: true
      }))

      try {
        const rawResponse = await fetch(
          `${process.env.REACT_APP_BASE_URL}/api/users/${userId}`,
          {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
          }
        )
        const response = await rawResponse.json()
        if (rawResponse.status === 200) {
          setUser((prevState) => ({
            ...prevState,
            fullName: response.fullName,
            username: response.username,
            dateOfBirth: response.dateOfBirth,
            gender: response.gender,
            address: response.address,
            emailAddress: response.emailAddress,
            phoneNumber: response.phoneNumber
          }))

          setComponentState(prevState => ({
            ...prevState,
            pending: false
          }))
        }
      } catch (e) {
        console.log(e)
      }
    }
    fetchUser()
  }, [])

  return (
    <>
    <button
        onClick={() =>
          setComponentState((prevState) => ({
            ...prevState,
            modalOpen: true
          }))
        }
        className="my-2 w-22 inline-flex items-center justify-center px-8 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700"
      >
        Edit User
      </button>
      {componentState.modalOpen && user && (
        <EditCurrentUserModal
          setComponentState={setComponentState}
          user={user}
          setUser={setUser}
          handleEditUser={handleEditUser}
          // error={error}
        />
      )}
    {!componentState.pending && user && role && <div className="overflow-x-auto shadow-md sm:rounded-lg py-auto">
          <table className="w-full text-sm text-center text-gray-500 dark:text-gray-400">
            <tbody>
              <tr className="bg-white border-b dark:bg-white-800 object-scale-down">
                <th className="px-6 py-4">Full Name:</th>
                <td className="px-6 py-4">{user.fullName}</td>
              </tr>
              <tr className="bg-white border-b dark:bg-white-800">
                <th className="px-6 py-4">Username:</th>
                <td className="px-6 py-4">{user.username}</td>
              </tr>
              <tr className="bg-white border-b dark:bg-white-800">
                <th className="px-6 py-4">Email Address:</th>
                <td className="px-6 py-4">{user.emailAddress}</td>
              </tr>
              <tr className="bg-white border-b dark:bg-white-800">
                <th className="px-6 py-4">Phone Number:</th>
                <td pattern="+[0-9]{3}-[0-9]{4}-[0-9]{3}" className="px-6 py-4">{user.phoneNumber}</td>
              </tr>
              <tr className="bg-white dark:bg-white-800">
                <th className="px-6 py-4">Role:</th>
                <td className="px-6 py-4">{role}</td>
              </tr>
            </tbody>
          </table>
        </div>}
    </>
  )
}

export default Profile
