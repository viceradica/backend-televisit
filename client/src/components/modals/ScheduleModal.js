import React, { useContext } from 'react'
import ParticipantContext from '../../context/ParticipantContext'
const ScheduleModal = ({
  setComponentState,
  newAppointment,
  setNewAppointment,
  handleSchedule
}) => {
  const { participants } = useContext(ParticipantContext)
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
                  {/* <!-- Heroicon name: outline/exclamation --> */}
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
                    Schedule new appointment
                  </h3>
                  <div className="mt-2">
                    <div className="py-3 text-gray-500">
                      <select
                        className="bg-white-50 border border-cyan-600 text-gray-400 rounded-lg block w-full p-2.5 ring-cyan-500 focus:ring-cyan-500 focus:border-cyan-500"
                        placeholder="Select date"
                        onInput={(e) =>
                          setNewAppointment((prevState) => ({
                            ...prevState,
                            patient: e.target.value
                          }))
                        }
                      >
                        <option default>Select Participant</option>
                        {participants.map((participant) => {
                          return (
                            <option
                              key={participant._id}
                              value={participant._id}
                            >
                              {participant.emailAddress}
                            </option>
                          )
                        })}
                      </select>
                    </div>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Choose date and time for your Televisit
                    </p>
                  </div>
                  <div className="py-3 text-gray-500">
                    Date:
                    <input
                      datepicker=""
                      datepicker-autohide=""
                      type="Date"
                      className="bg-white-50 border border-cyan-600 text-gray-400 rounded-lg block w-full p-2.5 ring-cyan-500 focus:ring-cyan-500 focus:border-cyan-500 datepicker-input"
                      placeholder="Select date"
                      onChange={(e) =>
                        setNewAppointment((prevState) => ({
                          ...prevState,
                          date: e.target.value
                        }))
                      }
                    />
                  </div>
                  <div className="py-3 text-gray-500">
                    Time:
                    <input
                      datepicker=""
                      datepicker-autohide=""
                      type="Time"
                      className="bg-white-50 border border-cyan-600 text-gray-400 rounded-lg block w-full p-2.5 ring-cyan-500 focus:ring-cyan-500 focus:border-cyan-500 datepicker-input"
                      placeholder="Select time"
                      onChange={(e) =>
                        setNewAppointment((prevState) => ({
                          ...prevState,
                          time: e.target.value
                        }))
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                onClick={() => handleSchedule(newAppointment)}
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-cyan-600 text-base font-medium text-white hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Schedule
              </button>
              <button
                onClick={() =>
                  setComponentState((prevState) => ({
                    ...prevState,
                    modalOpen: false
                  }))
                }
                type="button"
                className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
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

export default ScheduleModal
