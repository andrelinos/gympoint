import Sequelize, { Model } from 'sequelize';

class Checkin extends Model {
  static init(sequelize) {
    super.init(
      {
        student_id: Sequelize.STRING,
        plan_id: Sequelize.STRING,
        name: Sequelize.STRING,
        checkin: Sequelize.DATE,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Checkin;
