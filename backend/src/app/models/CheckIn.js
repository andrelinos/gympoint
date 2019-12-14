import Sequelize, { Model } from 'sequelize';

class CheckIn extends Model {
  static init(sequelize) {
    super.init(
      { student_id: Sequelize.INTEGER },
      { sequelize },
      {
        sequelize,
        tableName: 'checkins',
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Student, {
      foreignKey: 'student_id',
      as: 'student',
    });
  }
}

export default CheckIn;
