import * as Yup from 'yup';
// import { Op } from 'sequelize';

import Student from '../models/Student';

class StudentController {
  /**
   * List Students
   */
  async index(req, res) {
    const { page = 1, quantity = 20 } = req.query;

    const { rows: students } = await Student.findAndCountAll({
      limit: quantity,
      offset: (page - 1) * quantity,
      order: [['created_at', 'DESC']],
    });

    if (!students) {
      return res.status(400).json({ error: 'Student not exists.' });
    }

    return res.json(students);
  }

  async show(req, res) {
    const { id } = req.params;

    const students = await Student.findByPk(id);

    return res.json(students);
  }

  /**
   * Create Students
   */
  async store(req, res) {
    const validateSchema = requestBody => {
      const schema = Yup.object().shape({
        name: Yup.string().required(),
        email: Yup.string()
          .required()
          .email(),
        birthday: Yup.number()
          .required()
          .positive(),
        weight: Yup.number()
          .required()
          .positive(),
        height: Yup.number()
          .required()
          .positive(),
      });

      return schema.isValid(requestBody);
    };

    if (!(await validateSchema(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const studentExists = await Student.findOne({
      where: { email: req.body.email },
    });

    if (studentExists) {
      return res.status(400).json({ error: 'Student already exists.' });
    }
    const { id, name, email, weight, height, birthday } = await Student.create(
      req.body
    );

    return res.json({
      id,
      name,
      email,
      weight,
      height,
      birthday,
    });
  }

  /**
   * Update Students
   */
  async update(req, res) {
    const validateSchema = requestBody => {
      const schema = Yup.object().shape({
        name: Yup.string(),
        email: Yup.string().email(),
        birthday: Yup.number().positive(),
        weight: Yup.number().positive(),
        height: Yup.number().positive(),
      });

      return schema.isValid(requestBody);
    };

    if (!(await validateSchema(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const { email } = req.body;

    const student = await Student.findByPk(req.studentId);

    if (email !== student.email) {
      const studentExists = await Student.findOne({
        where: { email },
      });

      if (studentExists) {
        return res.status(400).json({ error: 'Student already exists.' });
      }
    }

    const { id, name, weight, height, birthday } = await student.update(
      req.body
    );

    return res.json({
      id,
      name,
      email,
      weight,
      height,
      birthday,
    });
  }
}
export default new StudentController();
