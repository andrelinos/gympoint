import Student from '../models/Student';

// import UserControler from './UserControler';

class StudentController {
  async store(req, res) {
    const studentExists = await Student.findOne({
      where: { email: req.body.email },
    });

    if (studentExists) {
      return res.status(400).json({ error: 'Student already exists.' });
    }
    const { id, name, email, peso, altura, idade } = await Student.create(
      req.body
    );

    return res.json({
      id,
      name,
      email,
      peso,
      altura,
      idade,
    });
  }

  async update(req, res) {
    const { email } = req.body;

    const student = await Student.findByPk(req.userId);

    if (email !== student.email) {
      const studentExists = await Student.findOne({
        where: { email },
      });

      if (studentExists) {
        return res.status(400).json({ error: 'Student already exists.' });
      }
    }

    const { id, name, peso, altura, idade } = await student.update(req.body);

    return res.json({
      id,
      name,
      email,
      peso,
      altura,
      idade,
    });
  }
}
export default new StudentController();
