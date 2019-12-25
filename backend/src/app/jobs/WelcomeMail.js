import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class WelcomeMail {
  get key() {
    return 'WelcomeMail';
  }

  async handle({ data }) {
    const { enrollment, student, plan, Price, start_date, end_date } = data;

    console.log(`Console LOG (DATA) ${JSON.stringify(data)} "\n\n"`);

    console.log(`Console LOG (STUDENT) ${JSON.stringify(student)} "\n\n"`);

    console.log(`Console LOG (PLAN) ${JSON.stringify(plan)} "\n\n"`);

    const startDate = format(
      parseISO(enrollment.start_date),
      "'dia' dd 'de' MMMM' de ' yyyy",
      {
        locale: pt,
      }
    );

    const endDate = format(
      parseISO(enrollment.end_date),
      "'dia' dd 'de' MMMM' de ' yyyy",
      {
        locale: pt,
      }
    );

    await Mail.sendMail({
      to: `${student.name} <${student.email}>`,
      subject: '[GYMPOINT] Seja bem vindo!',
      template: 'welcome',
      context: {
        student_name: student.name,
        plan_title: plan.title,
        plan_start_date: startDate,
        plan_end_date: endDate,
        plan_total_price: enrollment.price,
      },
    });
  }
}

export default new WelcomeMail();
