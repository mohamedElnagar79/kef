const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      service: "gmail",
      port: 465,
      secure: true,
      auth: {
        user: "araafun@gmail.com",
        pass: "",
      },
    });
    console.log("success",transporter)
    await transporter.sendMail({
      from: "araafun@gmail.com",
      to: email,
      subject: subject,
      text: text,
    });

    console.log("email sent sucessfully");
  } catch (error) {
    console.log(error);
    throw new Error("email not sent");
  }
};

module.exports = sendEmail;
