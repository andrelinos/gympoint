require('dotenv/config');

export default {
  // rocketseatgostack2019desafio2),
  /* secret: 'ed31fcf054118c588d173466037c921a',
  expiresIn: '7d', */

  secret: process.env.APP_SECRET,
  expiresIn: process.env.APP_EXPIRES,
};
