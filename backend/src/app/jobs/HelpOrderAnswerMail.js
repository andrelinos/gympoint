import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Mail from '../../lib/Mail';

class HelpOrderAnswerMail {
  get key() {
    return 'HelpOrderAnswerMail';
  }

  // All informations for email send
  async handle({ data }) {
    const { helpOrder } = data;

    console.log(`A fila executou.`);

    await Mail.sendMail({
      to: `${helpOrder.student.name} <${helpOrder.student.email}>`,
      subject: 'Pergunta respondida - GYMPoint',
      template: 'help_order_answer',
      context: {
        student_name: helpOrder.student.name,
        question: helpOrder.question,
        answer: helpOrder.answer,
        answer_at: format(parseISO(helpOrder.answerAt), 'dd/MMMM/yyyy HH:mm', {
          locale: pt,
        }),
        createdAt: format(parseISO(helpOrder.createdAt), 'dd/MMMM/yyyy HH:mm', {
          locale: pt,
        }),
        total: helpOrder.price,
      },
    });
  }
}

export default new HelpOrderAnswerMail();
