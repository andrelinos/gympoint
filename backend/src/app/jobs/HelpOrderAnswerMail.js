import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Mail from '../../lib/Mail';

class HelpOrderAnswerMail {
  get key() {
    return 'HelpOrderAnswerMails';
  }

  // All informations for email send
  async handle({ data }) {
    const { helpOrder } = data;

    const answerDate = format(
      parseISO(helpOrder.answered_at),
      "'dia' dd 'de' MMMM', às' H:mm'h'",
      {
        locale: pt,
      }
    );

    const questionDate = format(
      parseISO(helpOrder.createdAt),
      "'dia' dd 'de' MMMM', às' H:mm'h'",
      {
        locale: pt,
      }
    );

    await Mail.sendMail({
      to: `${helpOrder.student.name} <${helpOrder.student.email}>`,
      subject: '[GYMPOINT] Sua pergunta respondida',
      template: 'help_order_answer',
      context: {
        student_name: helpOrder.student.name,
        question: helpOrder.question,
        answer: helpOrder.answer,
        answered_at: answerDate,
        createdAt: questionDate,
        total: helpOrder.price,
      },
    });
  }
}

export default new HelpOrderAnswerMail();
