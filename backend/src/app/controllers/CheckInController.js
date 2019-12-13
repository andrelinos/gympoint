import * as Yup from 'yup';
import { startOfHour, addMonths, parseISO, isAfter } from 'date-fns';

import CheckIn from '../models/CheckIn';
import Student from '../models/Student';

// import UserControler from './UserControler';

class CheckInController {
  /**
   *  List checkins
   */
  async index(req, res) {
    try {
      const { page = 1, quantity = 20 } = req.query;

      const { student_id } = req.params;

      const student = await Student.findByPk(student_id);

      if (!student) {
        return res.status(400).json({ error: 'Student not found.' });
      }

      const { checkins } = await CheckIn.findAll({
        where: { student_id },
        attributes: ['id', 'created_at'],
        limit: quantity,
        offset: (page - 1) * quantity,
        order: [['created_at', 'DESC']],
      });

      if (!checkins) {
        return res.status(400).json({ error: 'No checkins found.' });
      }
      return res.json(checkins);
    } catch (err) {
      return res.status(400).json({ error: `Applications error. ( ) ` });
    }
  }
}
export default new CheckInController();
