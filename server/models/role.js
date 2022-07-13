import mongoose from 'mongoose';
import userRole from '../constants/userRole';

const { DOCTOR, GUEST, PATIENT } = userRole;

const RoleSchema = mongoose.Schema({
  name: {
    type: String,
    enum: [DOCTOR, GUEST, PATIENT],
    required: true,
    unique: true
  }
});

const Role = mongoose.model('Roles', RoleSchema);
export default Role;
