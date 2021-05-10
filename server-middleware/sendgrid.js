const sgMail = require("@sendgrid/mail");

const API_KEY = process.env.SENDGRID_API_KEY;
sgMail.setApiKey(API_KEY);

export async function sendEmail(templateId, to, extras) {
  try {
    const config = {
      to,
      from: "taylor@wunderfund.co",
      templateId,
      dynamic_template_data: { data: extras || {} },
    };
    await sgMail.send(config);
  } catch (error) {
    throw new Error(error);
  }
}
