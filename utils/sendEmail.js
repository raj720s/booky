import nodemailer from "nodemailer";

const sendMail = async (options) => {
  var transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_NAME,
      pass: process.env.SMTP_PASSWORD,
    },
  });
  const message = {
    from: `${process.env.SMTP_FROMNAME} <${process.env.SMTP_FROMEMAIL}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };
};

export default sendMail;
