import React, { useState, useContext } from 'react'
import agilathonLogoLg from '../images/agilathon.svg'
import { Link, useNavigate } from 'react-router-dom'
import UserContext from '../context/UserContext'
import { useCookies } from 'react-cookie'

const NavBar = () => {
  // eslint-disable-next-line
  const [cookies, setCookie, removeCookie] = useCookies(['user'])
  const { setUserObject } = useContext(UserContext)
  const { user, username, role } = useContext(UserContext)
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  const handleLogout = () => {
    removeCookie(['user'], ['username'], ['token'], ['role'], ['roleId'])
    setUserObject(null, null, null, null, null)
    navigate(0)
  }

  return (
    <>
      {/* This example requires Tailwind CSS v2.0+ */}
        <div className="w-full">
          <div className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
            <div className="flex justify-start lg:w-0 lg:flex-1">
              <Link to="/">
                <span className="sr-only">Agilathon</span>
                <img
                  className="h-8 w-auto sm:h-10"
                  src={agilathonLogoLg}
                  alt="Agilathon"
                />
              </Link>
            </div>
            <div className="-mr-2 -my-2 md:hidden">
              <button
                type="button"
                className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500"
                onClick={() => setOpen(!open)}
              >
                <span className="sr-only">Open menu</span>
                {/* Heroicon name: outline/menu */}
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
            <nav className="hidden md:flex space-x-10">
              {user && role === 'Doctor' && (
                <Link
                  to="/participants"
                  className="text-base font-medium text-gray-500 hover:text-gray-900"
                >
                  Participants
                </Link>
              )}
              {user && (
                <Link
                  to="/appointments"
                  className="text-base font-medium text-gray-500 hover:text-gray-900"
                >
                  Appointments
                </Link>
              )}
            </nav>
            <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
              {!user && (
                <Link
                  to="/login"
                  className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
                >
                  Sign in
                </Link>
              )}
              {user && role && (
                <Link
                  to={user}
                  className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
                >
                  {username}
                </Link>
              )}
              {user && role && (
                <button
                  onClick={handleLogout}
                  className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-cyan-600 hover:bg-cyan-700"
                >
                  Log out
                </button>
              )}
            </div>
          </div>
        </div>
        {/*
          Mobile menu, show/hide based on mobile menu state.

          Entering: "duration-200 ease-out"
            From: ""
            To: ""
          Leaving: "duration-100 ease-in"
            From: "opacity-100 scale-100"
            To: "opacity-0 scale-95"
            */}

        {open && <div
          className={
            open
              ? 'opacity-100 scale-100 transition ease-out duration-200 absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden'
              : 'opacity-0 scale-95 absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden'
          }
        >
          <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
            <div className="pt-5 pb-6 px-5">
              <div className="flex items-center justify-between">
                <div>
                  <Link to="/">
                    <img
                      className="h-8 w-auto"
                      src={agilathonLogoLg}
                      alt="Agilathon"
                    />
                  </Link>
                </div>
                <div className="-mr-2">
                  <button
                    type="button"
                    className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500"
                    onClick={() => setOpen(!open)}
                  >
                    <span className="sr-only">Close menu</span>
                    {/* Heroicon name: outline/x */}
                    <svg
                      className="h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="mt-6">
                <nav className="grid gap-y-8"></nav>
              </div>
            </div>
            <div className="py-6 px-5 space-y-6">
            <div>
                {user && (
                  <Link
                    to={user}
                    className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-cyan-600 hover:bg-cyan-700"
                    onClick={() => setOpen(!open)}
                  >
                    {username}
                  </Link>
                )}
              </div>
              <div>
                {user && role === 'Doctor' && (
                  <Link
                    to="/participants"
                    className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-cyan-600 hover:bg-cyan-700"
                    onClick={() => setOpen(!open)}
                  >
                    Participants
                  </Link>
                )}
              </div>

              <div>
                {user && (
                  <Link
                    to="/appointments"
                    className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-cyan-600 hover:bg-cyan-700"
                    onClick={() => setOpen(!open)}
                  >
                    Appointments
                  </Link>
                )}
              </div>
              <div>
                {user && (
                  <button
                    className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-cyan-600 hover:bg-cyan-700"
                    onClick={() => {
                      setOpen(!open)
                      handleLogout()
                    }
                    }
                  >
                    Log out
                  </button>
                )}
              </div>
              <div>
                {!user && (
                  <p className="mt-6 text-center text-base font-medium text-gray-500">
                    Existing customer?
                    {!user && (
                      <Link
                        to="/login"
                        className="text-cyan-600 hover:text-cyan-500"
                        onClick={() => setOpen(!open)}
                      >
                        {' '}
                        Sign in
                      </Link>
                    )}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>}
    </>
  )
}

export default NavBar
