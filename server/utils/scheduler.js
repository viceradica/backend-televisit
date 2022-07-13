import dayjs from 'dayjs';
import { createTransport } from 'nodemailer';
import dateTime from '../constants/datetime';
import scheduler from '../constants/scheduler';

const { HOURS, HOURS_IN_DAY } = scheduler;

export function shouldSendReminder(appointment) {
  const currentTime = dayjs().format(dateTime.DEFAULT_TIME_FORMAT);
  const visitTime = dayjs(appointment.visitDate);

  const difference = visitTime.diff(currentTime, HOURS);
  if (Math.abs(difference) <= HOURS_IN_DAY) {
    return true;
  }
  return false;
}

export const transport = (account) => {
  return createTransport(createTransportAccount(account));
};

function createTransportAccount(account) {
  return {
    host: account.smtp.host,
    port: account.smtp.port,
    secure: account.smtp.secure,
    auth: {
      user: account.user,
      pass: account.pass
    }
  };
}

export function createMessage(user, notification) {
  return {
    from: notification.sender,
    to: `${user.fullName} <${user.emailAddress}>`,
    subject: notification.subject,
    text: notification.content
  };
}
