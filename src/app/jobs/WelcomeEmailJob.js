import Mail from "../../lib/Mail";

class WelcomeEmailJob {
  get key() {
    return "WelcomeEmailJob";
  }

  async handle({ data }) {
    const { name, email } = data;

    Mail.send({
      to: email,
      subject: "Bem-vindo(a)",
      text: `Ola ${name}, bem-vindo(a) ao nosso sistema`,
    });
  }
}

export default new WelcomeEmailJob();
