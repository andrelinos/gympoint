const { format } = require('date-fns');
const bcrypt = require('bcryptjs');

module.exports = {
  up: QueryInterface => {
    return QueryInterface.bulkInsert(
      'users',
      [
        {
          name: 'Administrador',
          email: 'admin@gympoint.com',
          admin: true,
          password_hash: bcrypt.hashSync('123456', 8),
          created_at: format(new Date(), "yyyy-MM-dd'T'HH:mm:ssxxx"),
          updated_at: format(new Date(), "yyyy-MM-dd'T'HH:mm:ssxxx"),
        },
      ],
      {}
    );
  },

  down: () => {},
};
