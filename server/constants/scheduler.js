const SCHEDULER = {
  CRON_SCHEDULE: '0 0 * * *',
  HOURS: 'hours',
  HOURS_IN_DAY: 24,
  message: (name, time) => `Hello ${name},\n\n
  This is kind reminder that you have an appointment scheduled at: 
  ${time}`,
  sender: (user) => `Ivan App <${user}>`,
  SUBJECT: 'Appointment reminder'
};

export default SCHEDULER;