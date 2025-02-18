import nodemailer from 'nodemailer';

import { SMTP } from '../constants/index.js';
import { getEnv } from './getEnv.js';

const transporter = nodemailer.createTransport({
  host: getEnv(SMTP.SMTP_HOST),
  port: Number(getEnv(SMTP.SMTP_PORT)),
  auth: {
    user: getEnv(SMTP.SMTP_USER),
    pass: getEnv(SMTP.SMTP_PASSWORD),
  },
});

export const sendEmail = async (options) => {
  return await transporter.sendMail(options);
};
