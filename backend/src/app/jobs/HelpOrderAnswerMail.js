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

    const answearDate = format(
      parseISO(helpOrder.answearAt),
      "dd/MM/yyyy' às 'HH:mm",
      {
        locale: pt,
      }
    );

    const questionDate = format(
      parseISO(helpOrder.createdAt),
      "dd/MM/yyyy' às 'HH:mm",
      {
        locale: pt,
      }
    );

    console.log(`A fila executou. ${JSON.stringify(helpOrder.student.name)}`);

    await Mail.sendMail({
      to: `${helpOrder.student.name} <${helpOrder.student.email}>`,
      subject: '[GYMPO)INT] Sua pergunta respondida',
      template: 'help_order_answer',
      context: {
        student_name: helpOrder.student.name,
        question: helpOrder.question,
        answer: helpOrder.answer,
        answered_at: answearDate,
        createdAt: questionDate,
        total: helpOrder.price,
      },
    });
  }
}

export default new HelpOrderAnswerMail();
