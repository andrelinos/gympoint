import * as Yup from 'yup';
import Student from '../models/Student';
import HelpOrder from '../models/HelpOrder';

// import UserControler from './UserControler';

class StudentHelpOrder {
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

    const helpOrder = await HelpOrder.create({
      student_id: id,
      question: req.body.question,
    });

    return res.json(helpOrder);
  }
}

export default new StudentHelpOrder();
