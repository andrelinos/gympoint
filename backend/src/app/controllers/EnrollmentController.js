import * as Yup from 'yup';
import { startOfHour, addMonths, parseISO, isAfter } from 'date-fns';

import Enrollment from '../models/Enrollment';
import Student from '../models/Student';
import Plan from '../models/Plan';

// import UserControler from './UserControler';

class EnrollmentController {
  /**
   *  List Enrollments
   */
  async index(req, res) {
    try {
      const { page = 1, quantity = 20 } = req.query;

      const { rows: enrollments } = await Enrollment.findAndCountAll({
        limit: quantity,
        offset: (page - 1) * quantity,
      });

      if (!enrollments) {
        return res.status(400).json({ error: 'No enrollments found.' });
      }
      return res.json(enrollments);
    } catch (err) {
      return res.status(400).json({ error: 'No enrollments found.' });
    }
  }

  /**
   *  Create Enrollment
   */

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
    const plan = await Plan.findByPk(plan_id);
    if (!plan) {
      return res.status(400).json({ error: 'No plan found.' });
    }

    const parsedDate = parseISO(start_date);
    const past = isAfter(parsedDate, new Date());

    if (!past) {
      return res.json({ error: 'Incorrect start date or time.' });
    }

    // Calculate  date range and price
    const { price, duration } = plan;
    const startDate = startOfHour(parsedDate);

    const end_date = addMonths(startDate, duration);
    const Price = duration * price;

    const enrollment = await Enrollment.create({
      student_id,
      plan_id,
      start_date,
      end_date,
      price: Price,
    });

    return res.json(enrollment);
  }

  /**
   *  Update Enrollment
   */
  async update(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number().required(),
      plan_id: Yup.number().required(),
      start_date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
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
    const plan = await Plan.findByPk(plan_id);
    if (!plan) {
      return res.status(400).json({ error: 'No plan found.' });
    }

    const parsedDate = parseISO(start_date);
    const past = isAfter(parsedDate, new Date());

    if (!past) {
      return res.json({ error: 'Incorrect start date or time.' });
    }

    // Calculate  date range and price
    const { price, duration } = plan;
    const startDate = startOfHour(parsedDate);

    const end_date = addMonths(startDate, duration);
    const Price = duration * price;

    const enrollment = await Enrollment.update({
      student_id,
      plan_id,
      start_date,
      end_date,
      price: Price,
    });

    return res.json(enrollment);
  }

  /**
   *  Delete Enrollment
   */
  async delete(req, res) {
    const plan = await Plan.findByPk(req.params.id);

    if (!plan) {
      return res.status(400).json({ error: 'Plan not found.' });
    }

    await plan.destroy();

    return res.status(400).json({ ok: 'Plan deleted successfully!' });

    // return res.send();
  }
}
export default new EnrollmentController();
