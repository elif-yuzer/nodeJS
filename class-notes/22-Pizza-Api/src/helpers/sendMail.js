"use strict";

const nodemailer = require("nodemailer");

module.exports = function sendMail(to, subject, message) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "elifyuzer12@gmail.com",
      pass: "gwmx gjme jeca owpa",
    },
  });

  transporter.sendMail(
    {
      from: "perihankoyun545@gmail.com",
      to,
      subject,
      html: message,
    },
    (error, info) => {
      success ? console.log(success, "basarılı") : console.log(error, "hataa");
    },
  );
};
