const { format } = require('date-fns');

module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert('plans', [
      {
        title: 'Start',
        duration: 1,
        price: 129.0,
        created_at: format(new Date(), "yyyy-MM-dd'T'HH:mm:ssxxx"),
        updated_at: format(new Date(), "yyyy-MM-dd'T'HH:mm:ssxxx"),
      },
      {
        title: 'Gold',
        duration: 3,
        price: 109.0,
        created_at: format(new Date(), "yyyy-MM-dd'T'HH:mm:ssxxx"),
        updated_at: format(new Date(), "yyyy-MM-dd'T'HH:mm:ssxxx"),
      },
      {
        title: 'Diamond',
        duration: 6,
        price: 89.0,
        created_at: format(new Date(), "yyyy-MM-dd'T'HH:mm:ssxxx"),
        updated_at: format(new Date(), "yyyy-MM-dd'T'HH:mm:ssxxx"),
      },
    ]);
  },

  down: () => {},
};
