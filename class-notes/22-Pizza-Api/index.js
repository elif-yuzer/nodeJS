"use strict";
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
/*
    $ cp .env-sample .env
    $ npm init -y
    $ npm i express dotenv mongoose morgan swagger-autogen swagger-ui-express redoc-express
    $ mkdir logs
    $ npm run dev
*/

const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env?.PORT || 5000;

// Nested Query
app.set("query parser", "extended");

/* ------------------------------------------------------- */
//* Middlewares:

// Accept JSON:
app.use(express.json());

// Auhentication:
/* const { verifyJWT } = require("./src/middlewares/authentication");
app.use(verifyJWT); */

// Query Handler
app.use(require("./src/middlewares/queryHandler"));

// Logger:
app.use(require("./src/middlewares/logger"));

/* ------------------------------------------------------- */
//E mail
//$ npm i nodemailer
const nodemailer = require("nodemailer");

//send email with ethereal(fake) email
//create test account
//nodemailer.createTestAccount().then((email) => console.log(email));
/*  pass: 'EayTcKvGfxZmf4v2cP',
  smtp: { host: 'smtp.ethereal.email', port: 587, secure: false },
  imap: { host: 'imap.ethereal.email', port: 993, secure: true },
  pop3: { host: 'pop3.ethereal.email', port: 995, secure: true },
  web: 'https://ethereal.email',
  mxEnabled: false
}
 */

/* nodemailer.createTestAccount().then((account) => {
  const transporter = nodemailer.createTransport({
    host: account.smtp.host,
    port: account.smtp.port,
    secure: account.smtp.secure,
    auth: {
      user: account.user, // createTestAccount'tan gelen user
      pass: account.pass, // createTestAccount'tan gelen pass
    },
  });

  transporter.sendMail(
    {
      from: account.user,
      to: "info@ondiaacademy.com",
      subject: "hei",
      text: "hello there this is a test email.",
      html: "<p><b>Hello there,</b></p>",
    },
    (error, success) => {
      success ? console.log(success, "basarılı") : console.log(error, "hataa");
    },
  );
}); */
/* const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "elifyuzer12@gmail.com",
    pass: "gwmx gjme jeca owpa",
  },
});

transporter.sendMail(
  {
    from: "perihankoyun545@gmail.com",
    to: "elifyuzer12@gmail.com",
    text: "hello there this is a test email.",
    html: "<p><b>Hello there,</b></p>",
  },
  (error, success) => {
    success ? console.log(success, "basarılı") : console.log(error, "hataa");
  },
); */

//* Routes:

// HomePath
app.all("/", (req, res) => {
  res.send({
    error: false,
    message: "Welcome to PIZZA API",
    docs: {
      swagger: "/documents/swagger",
      redoc: "/documents/redoc",
      json: "/documents/json",
    },
    user: req.user,
  });
});

// Other path
app.use("/", require("./src/routes/"));

//Static route
app.use('/uploads',express.static('./src/uploads'))

/* ------------------------------------------------------- */
//* Error Handlers

// Not found route
app.all("/*splat", (req, res) => {
  res.errStatusCode = 404;
  throw new Error("Route is not found.");
});

// Error handler
app.use(require("./src/middlewares/errorHandler"));
/* ----------------------------------------- */
const server = app.listen(PORT, async () => {
  // DB Connection
  const { dbConnection } = require("./src/configs/dbConnection");
  await dbConnection()
    .then(() => console.log(`running at: http://127.0.0.1:${PORT}`))
    .catch(() => {
      console.log("Server shutting down due to DB connection failure.");
      server.close(() => process.exit(1));
    });

  //! seed function
  // require('./src/utils/sync')()
});
