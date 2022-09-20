import './App.css'
import LoginForm from './components/LoginForm'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import React, { useContext, useEffect } from 'react'
import Home from './components/Home'
import NavBar from './components/Navbar'
import UserContext from './context/UserContext'
import Participant from './components/Participant'
import Appointments from './components/Appointments'
import DoctorAppointment from './components/DoctorAppointment'
import Profile from './components/Profile'
import Participants from './components/Participants'
import { ParticipantProvider } from './context/ParticipantContext'
function App () {
  const { setUserObject } = useContext(UserContext)
  // eslint-disable-next-line
  const [cookies, setCookies] = useCookies(
    ['user'],
    ['username'],
    ['token'],
    ['role'],
    ['roleId']
  )
  useEffect(() => {
    if (cookies.user && cookies.roleId) {
      setUserObject(
        cookies.user,
        cookies.username,
        cookies.token,
        cookies.roleId,
        cookies.role
      )
    }
  }, [cookies])

  return (
    <div className="px-4">
      <ParticipantProvider>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:userId" element={<Profile />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/participants" element={<Participants />} />
            <Route path="/participants/:userId" element={<Participant />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route
              path="/appointments/:appointmentId"
              element={<DoctorAppointment />}
            />
          </Routes>
        </BrowserRouter>
      </ParticipantProvider>
    </div>
  )
}

export default App
