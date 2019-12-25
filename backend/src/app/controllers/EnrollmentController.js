import * as Yup from 'yup';
import { startOfHour, addMonths, parseISO, isAfter } from 'date-fns';

import Enrollment from '../models/Enrollment';
import Student from '../models/Student';
import Plan from '../models/Plan';

import Queue from '../../lib/Queue';
import WelcomeMail from '../jobs/WelcomeMail';

// import UserControler from './UserControler';

class EnrollmentController {
  async index(req, res) {
    const { page = 1, quantity = 20 } = req.query;

    const { rows: enrollments } = await Enrollment.findAndCountAll({
      limit: quantity,
      offset: (page - 1) * quantity,
      order: [['created_at', 'DESC']],
    });

    return res.json(enrollments);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number().required(),
      plan_id: Yup.number().required(),
      start_date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed.' });
    }

    const { student_id, plan_id, start_date } = req.body;

    // Check if this student already has an enrollment
    const enrollmentExists = await Enrollment.findOne({
      where: { student_id },
    });

    if (enrollmentExists) {
      return res.status(401).json({
        error: 'A enrollment with this student already exists.',
      });
    }

    // Verify student exists
    const student = await Student.findByPk(student_id);
    if (!student) {
      return res.status(400).json({ error: 'No stundent found.' });
    }

    // Verify plan exists
    const planCheck = await Plan.findByPk(plan_id);
    if (!planCheck) {
      return res.status(400).json({ error: 'No plan found.' });
    }

    // Verify date to start is incorrect
    const parsedDate = parseISO(start_date);
    const past = isAfter(parsedDate, new Date());

    if (!past) {
      return res.json({ error: 'Incorrect start date or time.' });
    }

    // Calculate  date range and price
    const plan = await Plan.findByPk(plan_id);

    const startDate = startOfHour(parsedDate);

    const end_date = addMonths(startDate, plan.duration);

    const Price = plan.duration * plan.price;

    const enrollment = await Enrollment.create({
      student_id,
      plan_id,
      start_date,
      end_date,
      price: Price,
    });

    // Send Welcome e-mail
    await Queue.add(WelcomeMail.key, {
      enrollment,
    });

    return res.json(enrollment);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number().required(),
      plan_id: Yup.number().required(),
      start_date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    // Req fields
    const { student_id, plan_id, start_date } = req.body;

    // Verify student exists
    const studentExists = await Student.findByPk(student_id);
    if (!studentExists) {
      return res.status(400).json({ error: 'No stundent found.' });
    }

    // Verify plan exists
    const plan = await Plan.findByPk(plan_id);
    if (!plan) {
      return res.status(400).json({ error: 'No plan found.' });
    }

    const parsedDate = parseISO(start_date);
    const past = isAfter(parsedDate, new Date());

    if (!past) {
      return res.json({ error: 'Incorrect start date or time.' });
    }

    // Check if this student already has an enrollment
    const enrollment = await Enrollment.findByPk(req.params.id);

    if (!enrollment) {
      return res.status(401).json({ error: 'No enrollment found.' });
    }

    // Calculate  date range and price
    const { price, duration } = plan;
    const startDate = startOfHour(parsedDate);

    const end_date = addMonths(startDate, duration);
    const Price = duration * price;

    await enrollment.update({
      student_id,
      plan_id,
      start_date,
      end_date,
      price: Price,
    });

    return res.json(enrollment);
  }

  async delete(req, res) {
    const enrollments = await Enrollment.findByPk(req.params.id);

    if (!enrollments) {
      return res.status(400).json({ error: 'No enrollment found.' });
    }

    await enrollments.destroy();

    return res.status(200).json({ ok: 'Enrollment deleted successfully!' });
  }
}
export default new EnrollmentController();
