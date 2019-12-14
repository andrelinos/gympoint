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
    const { page = 1, quantity = 20, id } = req.query;

    const checkins = await CheckIn.findAll({
      where: { student_id: id },
      limit: quantity,
      offset: (page - 1) * quantity,
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name', 'email'],
        },
      ],
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
        .json({ error: 'Your enrollment is not able to join the gym' });
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
