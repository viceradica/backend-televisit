import dayjs from 'dayjs';
import dateTime from '../constants/datetime';
import notificationType from '../constants/notificationType';
import scheduler from '../constants/scheduler';
import Notification from '../models/notification';
import User from '../models/user';

const { message, sender, SUBJECT } = scheduler;
const { CUSTOM_TIME_FORMAT, DEFAULT_TIME_FORMAT } = dateTime;

export async function getNotificationData(appointment, sender) {
  try {
    const user = await User.findOne({ _id: appointment.patient });
    const notification = await createNotification(
      user, appointment, sender.user);

    return { user, notification };
  } catch (error) {
    console.log(error);
  }
}

async function createNotification(user, appointment, senderName) {
  try {
    const visitTime = dayjs(appointment.visitDate).format(CUSTOM_TIME_FORMAT);
    const messageContent = message(user.fullName, visitTime);

    const notification = new Notification({
      type: notificationType.EMAIL,
      deliveryTime: dayjs().format(DEFAULT_TIME_FORMAT),
      sender: sender(senderName),
      recipient: user._id,
      subject: SUBJECT,
      content: messageContent
    });

    return await notification.save();
  } catch (error) {
    console.log(error.message);
  }
}