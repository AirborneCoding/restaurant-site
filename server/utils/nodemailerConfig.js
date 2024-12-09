export default {
  host: 'smtp.gmail.com',
  port: 587,
  auth: {
    user: 'airborneCoding@gmail.com',
    pass: process.env.EMAIL_APP_PASSWORD,
  },
};
