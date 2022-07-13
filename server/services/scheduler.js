import nodemailer from 'nodemailer';
import cron from 'node-cron';
import appointmentType from '../constants/appointmentType';
import Appointment from '../models/appointment';
import {
  createMessage,
  shouldSendReminder,
  transport
} from '../utils/scheduler';
import { getNotificationData } from './notification';
import infoMessage from '../constants/infoMessage';
import errorMessage from '../constants/errorMessage';
import scheduler from '../constants/scheduler';

const { createTestAccount, getTestMessageUrl } = nodemailer;
const { emailAccountError, emailSendError } = errorMessage.NOTIFICATION;

cron.schedule(scheduler.CRON_SCHEDULE, async function() {
  try {
    const appointments = await Appointment
      .find({ scheduled: appointmentType.SCHEDULED });
    processAppointments(appointments);
  } catch (error) {
    console.log(error);
  }
});

function processAppointments(appointments) {
  appointments.forEach(appointment => {
    if (shouldSendReminder(appointment)) {
      sendAppointmentReminder(appointment);
    }
  });
}

function sendAppointmentReminder(appointment) {
  createTestAccount(async(error, account) => {
    if (error) {
      console.error(emailAccountError, error.message);
    }
    const { user, notification } = await getNotificationData(
      appointment, account);

    const message = createMessage(user, notification);
    sendEmailNotification(transport(account), message);
  });
}

async function sendEmailNotification(transporter, message) {
  try {
    const info = await transporter.sendMail(message);
    console.log(infoMessage.NOTIFICATION_SENT, getTestMessageUrl(info));
  } catch (error) {
    console.log(emailSendError, error.message);
  }
}