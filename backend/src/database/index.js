import Sequelize from 'sequelize';

import Student from '../app/models/Student';
import User from '../app/models/User';
import Plan from '../app/models/Plan';
import Enrollment from '../app/models/Enrollment';
import HelpOrder from '../app/models/StudentHelpOrder';
import CheckIn from '../app/models/CheckIn';

import databaseConfig from '../config/database';

const models = [Student, User, Plan, Enrollment, HelpOrder, CheckIn];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.map(model => model.init(this.connection));
  }
}

export default new Database();
