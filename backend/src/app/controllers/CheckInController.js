import { subDays, isAfter } from 'date-fns';
import { Op } from 'sequelize';

import CheckIn from '../models/CheckIn';
import Student from '../models/Student';
import Enrollment from '../models/Enrollment';

// import UserControler from './UserControler';

class CheckInController {
  /**
   *  List checkins
   */
  async index(req, res) {
    const { page = 1, quantity = 20 } = req.query;
    const { student_id } = req.params;

    const students = await Student.findByPk(student_id);

    if (!students) {
      return res.status(400).json({ error: 'Student not found.' });
    }
    const checkins = await CheckIn.findAll({
      where: { student_id },
      limit: quantity,
      offset: (page - 1) * quantity,
      attributes: ['id', 'created_at'],
      order: [['created_at', 'DESC']],
    });

    return res.json(checkins);
  }

  async store(req, res) {
    const { id } = req.params;

    // Check if the student is able to enter gym
    const isStudentAble = await Enrollment.findOne({
      where: { student_id: id },
    });

    if (!isStudentAble || !isAfter(isStudentAble.end_date, new Date())) {
      return res
        .status(401)
        .json({ error: 'Your enrollment is not active to join the gym.' });
    }

    const checkins = await CheckIn.findAll({
      where: {
        student_id: id,
        created_at: { [Op.between]: [subDays(new Date(), 7), new Date()] },
      },
    });

    if (checkins.length >= 5) {
      return res
        .status(401)
        .json({ error: 'You can only check-in five times in a week' });
    }

    const checkin = await CheckIn.create({ student_id: id });

    return res.json(checkin);
  }
}
export default new CheckInController();
