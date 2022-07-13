import mongoose from 'mongoose';
import notificationType from '../constants/notificationType';

const { EMAIL, INFO, PUSH, SMS, WARNING } = notificationType;

const NotificationSchema = mongoose.Schema({
  type: {
    type: String,
    enum: [EMAIL, INFO, PUSH, SMS, WARNING],
    required: true
  },
  deliveryTime: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  sender: {
    type: String,
    required: true
  },
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true
  }
});

const Notification = mongoose.model('Notifications', NotificationSchema);
export default Notification;
