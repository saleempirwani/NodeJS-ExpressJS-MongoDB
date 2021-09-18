const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "example@example.com",
    subject: "Welcome to joining in.",
    text: `Hello, Mr/Ms ${name}`,
  });
};

const sendCancellationEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "example@example.com",
    subject: "Sorry, you no longer exist",
    text: `Goodbye, Mr/Ms ${name}`,
  });
};

module.exports = {
  sendWelcomeEmail,
  sendCancellationEmail,
};
