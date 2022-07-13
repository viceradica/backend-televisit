import mongoose from 'mongoose';
import dayjs from 'dayjs';
import User from './user';
import appointmentType from '../constants/appointmentType';
import scheduler from '../constants/scheduler';

const { CANCELED, DONE, MISSED, RESCHEDULED, SCHEDULED } = appointmentType;

const AppointmentSchema = mongoose.Schema({
  type: {
    type: String,
    enum: [CANCELED, DONE, MISSED, RESCHEDULED, SCHEDULED],
    required: true
  },
  scheduledDate: {
    type: String
  },
  visitDate: {
    type: String,
    required: true
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true
  },
  done: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

AppointmentSchema.pre('save', async function() {
  this.scheduledDate = dayjs().format(scheduler.defaultTimeFormat);
  await updateAvailability(this.doctor);
});

async function updateAvailability(userId) {
  try {
    await User.findOneAndUpdate({ _id: userId }, { available: false });
  } catch (error) {
    throw new Error(error.message);
  }
}

const Appointment = mongoose.model('Appointments', AppointmentSchema);
export default Appointment;
