require('dotenv/config');

export default {
  host: 'smtp.mailtrap.io',
  port: '2525',
  secure: false,
  auth: {
    user: '95ebdaa6ca1409',
    pass: 'e548c45f437d73',
  },
  default: {
    from: process.env.MAIL_TXT_DEFAULT,
  },
};
