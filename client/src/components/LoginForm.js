import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { LockClosedIcon } from '@heroicons/react/solid'
import agilathonLogo from '../images/agilathon.svg'
import UserContext from '../context/UserContext'
import { useCookies } from 'react-cookie'

const LoginForm = () => {
  /* eslint-disable-next-line */
  const [cookies, setCookie] = useCookies(["user"])
  const { setUserObject, user } = useContext(UserContext)
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)

  console.log(process.env.REACT_APP_BASE_URL)
  useEffect(() => {
    if (user) navigate('/')
  }, [user])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const creds = { username, password }
    const rawResponse = await fetch(`${process.env.REACT_APP_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
      },
      body: JSON.stringify(creds)
    })
    try {
      const response = await rawResponse.json()
      const user = await response.user
      console.log(response)
      if (user.role) {
        const roleRawResponse = await fetch(
          `${process.env.REACT_APP_BASE_URL}/api/roles/${user.role}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Methods': 'GET',
              'Access-Control-Allow-Headers': 'Content-Type',
              Authorization: `Bearer ${user.token}`
            }
          }
        )
        const roleResponse = await roleRawResponse.json()

        setUserObject(
          user._id,
          user.username,
          user.token,
          user.role,
          roleResponse.name
        )

        setCookie('user', user._id, { path: '/', expires: tomorrow })
        setCookie('username', user.username, { path: '/', expires: tomorrow })
        setCookie('token', user.token, { path: '/', expires: tomorrow })
        setCookie('roleId', user.role, { path: '/', expires: tomorrow })
        setCookie('role', roleResponse.name, { path: '/', expires: tomorrow })
        navigate(0)
      } else {
        setError(response.errors)
        console.log(error)
      }
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="py-2">
            <img
              className="mx-auto h-12 w-auto"
              src={agilathonLogo}
              alt="agilathonLogo"
            />
          </div>
          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-6"
            action="#"
            method="POST"
          >
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="username" className="sr-only">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="username"
                  autoComplete="username"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 focus:z-10 sm:text-sm"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-cyan-600 focus:ring-cyan-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                {/* Placeholder */}
                {/* <a
                  className="font-medium text-cyan-600 hover:text-cyan-500"
                >
                  Forgot your password?
                </a> */}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-cyan-500 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 text-cyan-300 group-hover:text-cyan-400"
                    aria-hidden="true"
                  />
                </span>
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default LoginForm
