import React from 'react'

const NewParticipantModal = ({
  setComponentState,
  newParticipant,
  setNewParticipant,
  handleNewParticipant,
  error
}) => {
  return (
    <div
      className="relative z-0"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
          <div className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-cyan-100 sm:mx-0 sm:h-10 sm:w-10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3
                    className="text-lg leading-6 font-medium text-gray-900"
                    id="modal-title"
                  >
                    New Participant
                  </h3>
                  <div className="grid grid-rows-4 grid-flow-col gap-4">
                    <div className="py-2 text-gray-500">
                      Full Name:
                      <input
                        className="bg-white-50 border border-cyan-600 text-gray-400 rounded-lg block w-full p-2.5 ring-cyan-500 focus:ring-cyan-500 focus:border-cyan-500"
                        placeholder="Full Name"
                        onChange={(e) =>
                          setNewParticipant((prevState) => ({
                            ...prevState,
                            fullName: e.target.value
                          }))
                        }
                      />
                    </div>
                    <div className="py-2 text-gray-500">
                      Username:
                      <input
                        type="username"
                        className="bg-white-50 border border-cyan-600 text-gray-400 rounded-lg block w-full p-2.5 ring-cyan-500 focus:ring-cyan-500 focus:border-cyan-500"
                        placeholder="Username"
                        onChange={(e) =>
                          setNewParticipant((prevState) => ({
                            ...prevState,
                            username: e.target.value
                          }))
                        }
                      />
                    </div>
                    <div className="py-2 text-gray-500">
                      Email Address:
                      <input
                        autoComplete="email"
                        type="email"
                        className="bg-white-50 border border-cyan-600 text-gray-400 rounded-lg block w-full p-2.5 ring-cyan-500 focus:ring-cyan-500 focus:border-cyan-500"
                        placeholder="Email Address"
                        onChange={(e) =>
                          setNewParticipant((prevState) => ({
                            ...prevState,
                            emailAddress: e.target.value
                          }))
                        }
                      />
                    </div>
                    <div className="py-2 text-gray-500">
                      Password:
                      <input
                        autoComplete="password"
                        type="password"
                        className="bg-white-50 border border-cyan-600 text-gray-400 rounded-lg block w-full p-2.5 ring-cyan-500 focus:ring-cyan-500 focus:border-cyan-500"
                        placeholder="Password"
                        onChange={(e) =>
                          setNewParticipant((prevState) => ({
                            ...prevState,
                            password: e.target.value
                          }))
                        }
                      />
                    </div>
                    <div className="py-2 text-gray-500">
                      Address:
                      <input
                        className="bg-white-50 border border-cyan-600 text-gray-400 rounded-lg block w-full p-2.5 ring-cyan-500 focus:ring-cyan-500 focus:border-cyan-500"
                        placeholder="Physical Address"
                        onChange={(e) =>
                          setNewParticipant((prevState) => ({
                            ...prevState,
                            address: e.target.value
                          }))
                        }
                      />
                    </div>
                    <div className="py-2 text-gray-500">
                      Gender:
                      <select
                        className="bg-white-50 border border-cyan-600 text-gray-400 rounded-lg block w-full p-2.5 ring-cyan-500 focus:ring-cyan-500 focus:border-cyan-500"
                        placeholder="Physical Address"
                        onChange={(e) =>
                          setNewParticipant((prevState) => ({
                            ...prevState,
                            gender: e.target.value
                          }))
                        }
                      >
                        <option
                          value={null}
                          selected="true"
                          disabled="disabled"
                        >
                          Select gender
                        </option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </div>
                    <div className="py-2 text-gray-500">
                      Date of birth:
                      <input
                        type="Date"
                        className="bg-white-50 border border-cyan-600 text-gray-400 rounded-lg block w-full p-2.5 ring-cyan-500 focus:ring-cyan-500 focus:border-cyan-500 datepicker-input"
                        placeholder="Select date"
                        onChange={(e) =>
                          setNewParticipant((prevState) => ({
                            ...prevState,
                            dateOfBirth: e.target.value
                          }))
                        }
                      />
                    </div>
                    <div className="py-2 text-gray-500">
                      Phone Number:
                      <input
                        type="tel"
                        pattern="+[0-9]{3}[0-9]{7}"
                        className="bg-white-50 border border-cyan-600 text-gray-400 rounded-lg block w-full p-2.5 ring-cyan-500 focus:ring-cyan-500 focus:border-cyan-500"
                        placeholder="+15055558888"
                        onChange={(e) =>
                          setNewParticipant((prevState) => ({
                            ...prevState,
                            phoneNumber: e.target.value
                          }))
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
              {error && <p>{error}</p>}
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                onClick={() => handleNewParticipant(newParticipant)}
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-3 bg-cyan-600 text-base font-medium text-white hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Add Participant
              </button>
              <button
                onClick={() =>
                  setComponentState((prevState) => ({
                    ...prevState,
                    modalOpen: false
                  }))
                }
                type="button"
                className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-3 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewParticipantModal
