import * as Yup from 'yup';
import Student from '../models/Student';
import HelpOrder from '../models/Checkin';

class CheckInController {
  async index(req, res) {
    return res.json();
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'validation fails' });
    }

    const { student_id, date } = req.body;

    /**
     *  Check if user is student
     */

    const checkIsStudent = await Student.findOne({
      where: { id: student_id, student: true },
    });

    if (!checkIsStudent) {
      return res.status(401).json({ error: 'You not a student.' });
    }

    const helporder = await HelpOrder.create({
      student_id: req.studentId,
    });
    return res.json(helporder);
  }
}

export default new CheckInController();
