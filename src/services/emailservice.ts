import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");

type MailerDetails = {
  to: string;
  data: object;
};

type MailerOptions = {
  to: string;
  subject: string;
  text: string;
  html: string;
};

type MailerTemplateOptions = {
  to: string;
  templateId: string;
  dynamic_template_data: object;
};

export class Mailer {
  async sendEmail(option: MailerOptions) {
    await sgMail.send({
      from: {
        name: "Personal",
        email: "info@personal.ge",
      },
      ...option,
    });
  }

  async sendTemplateEmail(option: MailerTemplateOptions) {
    await sgMail.send({
      from: {
        name: "Personal",
        email: "info@personal.ge",
      },
      ...option,
    });
  }
}
