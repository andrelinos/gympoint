import * as Yup from 'yup';

import Plan from '../models/Plan';

// import UserControler from './UserControler';

class PlanController {
  /**
   * List Plans
   */
  async index(req, res) {
    const { page = 1, quantity = 20 } = req.query;

    const { rows: plans } = await Plan.findAndCountAll({
      limit: quantity,
      offset: (page - 1) * quantity,
      order: [['created_at', 'DESC']],
    });

    return res.json(plans);
  }

  /**
   * Create Plans
   */
  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number().required(),
      price: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const planExists = await Plan.findOne({
      where: { title: req.body.title },
    });

    if (planExists) {
      return res.status(400).json({ error: 'Plan already exists.' });
    }

    const { id, title, duration, price } = await Plan.create(req.body);

    return res.json({
      id,
      title,
      duration,
      price,
    });
  }

  /**
   * Update Plans
   */
  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number().required(),
      price: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const plan = await Plan.findByPk(req.params.id);
    if (!plan) {
      return res.status(400).json({ error: 'Plan not found.' });
    }

    const updatedPlan = await plan.update(req.body);

    return res.json(updatedPlan).sort((a, b) => {
      return a.score < b.score;
    });
  }

  async delete(req, res) {
    const plan = await Plan.findByPk(req.params.id);

    if (!plan) {
      return res.status(400).json({ error: 'Plan not found.' });
    }

    await plan.destroy();

    return res.status(400).json({ ok: 'Plan deleted successfully!' });
  }
}

export default new PlanController();
