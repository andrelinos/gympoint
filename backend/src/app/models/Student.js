import Sequelize, { Model } from 'sequelize';

class Student extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        weight: Sequelize.STRING,
        height: Sequelize.STRING,
        birthday: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  checkEmail(oldEmail) {
    return oldEmail === this.email;
  }
}
export default Student;
