import * as Yup from 'yup';
import HelpOrder from '../models/HelpOrder';

class HelpOrderController {
  /**
   *  List help orders
   */
  async index(req, res) {
    const { page = 1, quantity = 20 } = req.query;

    const { rows: helporders } = await HelpOrder.findAndCountAll({
      where: { answered_at: null },
      limit: quantity,
      offset: (page - 1) * quantity,
      order: [['created_at', 'ASC']],
    });

    if (!helporders) {
      return res.status(400).json({ error: 'No users found.' });
    }

    return res.json(helporders);
  }

  /**
   *  List answer orders
   */
  async update(req, res) {
    const validateSchema = requestBody => {
      const schema = Yup.object().shape({
        answer: Yup.string().required(),
      });

      return schema.isValid(requestBody);
    };

    if (!(await validateSchema(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const { id } = req.params;
    const helporders = await HelpOrder.findByPk(id);

    if (!helporders) {
      return res.status(400).json({ error: 'Help order not found.' });
    }

    if (helporders.answer) {
      return res
        .status(400)
        .json({ error: 'Help order has already been answered.' });
    }

    const { answer } = req.body;

    helporders.answer = answer;
    helporders.answered_at = new Date();
    helporders.save();

    /* await queueMicrotask.add(HelpOrderAnswerMails.key, {
      helporders,
    });
     */

    return res.json(helporders);
  }
}

export default new HelpOrderController();
