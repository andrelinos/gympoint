import { subDays, isAfter, addDays, format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import * as Yup from 'yup';
import { Op } from 'sequelize';
import Student from '../models/Student';
import HelpOrder from '../models/HelpOrder';

// import UserControler from './UserControler';

class StudentHelpOrder {
  /**
   *  List help orders
   */
  async index(req, res) {
    const { id } = req.params;

    // Check if student exist
    const students = await Student.findByPk(id);
    if (!students) {
      return res.status(400).json({ error: 'Student not found.' });
    }

    // Check if help orders
    const helporders = await HelpOrder.findByPk(id);
    if (!helporders) {
      return res.status(400).json({ error: 'No help orders found.' });
    }

    return res.json(helporders);
  }

  /**
   *  List help orders
   */
  async store(req, res) {
    const validateSchema = requestBody => {
      const schema = Yup.object().shape({
        question: Yup.string().required(),
      });

      return schema.isValid(requestBody);
    };

    if (!(await validateSchema(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    // Check student exists
    const { id } = req.params;
    const students = await Student.findByPk(id);

    if (!students) {
      return res.status(400).json({ error: 'No stundent found.' });
    }

    // const { student_id } = await HelpOrder.req.body;
    /* const helpOrderExists = await HelpOrder.findOne({
      where: {
        student_id,
        question,
      },
    });

    if (helpOrderExists) {
      return res.status(400).json({ error: 'Help order already exists.' });
    } */

    /**
     *  Mourabraz
     */
    const helpOrder = await HelpOrder.create({
      id,
      student_id: req.studentId,
      question: req.body.question,
    });

    return res.json(helpOrder);
  }
}

export default new StudentHelpOrder();
