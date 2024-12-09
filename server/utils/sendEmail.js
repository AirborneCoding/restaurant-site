import nodemailer from 'nodemailer';
import nodemailerConfig from './nodemailerConfig.js';

const sendEmail = async ({ to, subject, html }) => {

  const transporter = nodemailer.createTransport(nodemailerConfig);

  return transporter.sendMail({
    from: '"Panda Restaurant" <airborneCoding@gmail.com>',// sender address
    to,
    subject,
    html,
  });
};

export default sendEmail;
