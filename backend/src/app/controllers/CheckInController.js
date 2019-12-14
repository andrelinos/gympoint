import { subDays, isAfter, addDays, format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { Op } from 'sequelize';
import Checkin from '../models/Checkin';
import Student from '../models/Student';
import Enrollment from '../models/Enrollment';

// import UserControler from './UserControler';

class CheckInController {
  /**
   *  List checkins
   */
  async index(req, res) {
    const { id } = req.params;

    // Check if student exist
    const students = await Student.findByPk(id);
    if (!students) {
      return res.status(400).json({ error: 'Student not found.' });
    }

    // Check if student have checkins
    const checkinStundent = await Checkin.findByPk(id);
    if (!checkinStundent) {
      return res.status(400).json({ error: 'No checkins stundent found.' });
    }

    // List Checkins by student ID
    const checkins = await Checkin.findAll({
      where: { student_id: id },
      attributes: ['id', 'student_id', 'created_at'],
      order: [['created_at', 'DESC']],
    });

    return res.json(checkins);
  }

  async store(req, res) {
    const { id } = req.params;

    // Check if the student can enter the gym
    const checkStundent = await Enrollment.findOne({
      where: { student_id: id },
    });

    if (!checkStundent || !isAfter(checkStundent.end_date, new Date())) {
      return res
        .status(401)
        .json({ error: 'Your enrollment is not active to join the gym.' });
    }

    const checkins = await Checkin.findAll({
      where: {
        student_id: id,
        created_at: { [Op.between]: [subDays(new Date(), 7), new Date()] },
      },
    });

    if (checkins.length >= 5) {
      const lastCheckin = await Checkin.findOne({
        where: { student_id: id },
        offset: 4,
      });
      const nextAvailableCheckin = addDays(lastCheckin.created_at, 7);

      console.log(
        `Estou aqui: >>>>>>>>>>>>>>>>>> ${lastCheckin}  ${nextAvailableCheckin} <<<<<<<<<<<<<<<<<<<<<<<<<<<<`
      );

      const formatedNextAvaliableCheckin = format(
        nextAvailableCheckin,
        'dd/MM/yyyy HH:mm',
        {
          locale: pt,
        }
      );

      return res.status(401).json({
        error: `You can only check-in five times in a week. You next check-in
        `,
      });
    }

    const checkin = await Checkin.create({ student_id: id });

    return res.json(checkin);
  }
}
export default new CheckInController();
