import Sequelize from 'sequelize';

import Student from '../app/models/Student';
import User from '../app/models/User';
import Plan from '../app/models/Plan';
import Enrollment from '../app/models/Enrollment';
import StudentHelpOrder from '../app/models/StudentHelpOrder';
import GymHelpOrder from '../app/models/GymHelpOrder';
import Checkin from '../app/models/Checkin';

import databaseConfig from '../config/database';

const models = [
  Student,
  User,
  Plan,
  Enrollment,
  Checkin,
  StudentHelpOrder,
  GymHelpOrder,
];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
