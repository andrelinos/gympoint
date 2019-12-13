const { format } = require('date-fns');

module.exports = {
  up: QueryInterface => {
    return QueryInterface.bulkInsert(
      'students',
      [
        {
          name: 'Andrelino',
          email: 'andrelino@gympoint.com',
          birthday: '28',
          weight: '95',
          height: '2.10',
          created_at: format(new Date(), "yyyy-MM-dd'T'HH:mm:ssxxx"),
          updated_at: format(new Date(), "yyyy-MM-dd'T'HH:mm:ssxxx"),
        },
        {
          name: 'Andre',
          email: 'andre@gympoint.com',
          birthday: '28',
          weight: '95',
          height: '2.10',
          created_at: format(new Date(), "yyyy-MM-dd'T'HH:mm:ssxxx"),
          updated_at: format(new Date(), "yyyy-MM-dd'T'HH:mm:ssxxx"),
        },
        {
          name: 'Juliana',
          email: 'juliana@gympoint.com',
          birthday: '28',
          weight: '95',
          height: '2.10',
          created_at: format(new Date(), "yyyy-MM-dd'T'HH:mm:ssxxx"),
          updated_at: format(new Date(), "yyyy-MM-dd'T'HH:mm:ssxxx"),
        },
      ],
      {}
    );
  },

  down: () => {},
};
