"use strict";

const welcomeTemplate = ({ username, email, firstName = "" }) => {
  const displayName = firstName || username;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Welcome to PizzaApp</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #f4f4f4;
      font-family: Arial, sans-serif;
    }
    .wrapper {
      max-width: 600px;
      margin: 40px auto;
      background-color: #ffffff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    .header {
      background-color: #2e7d32;
      padding: 36px 40px;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      color: #ffffff;
      font-size: 28px;
      letter-spacing: 1px;
    }
    .header p {
      margin: 8px 0 0;
      color: #c8e6c9;
      font-size: 14px;
    }
    .body {
      padding: 36px 40px;
      color: #333333;
    }
    .body h2 {
      color: #2e7d32;
      margin-top: 0;
    }
    .body p {
      line-height: 1.7;
      font-size: 15px;
      color: #555555;
    }
    .highlight {
      color: #2e7d32;
      font-weight: bold;
    }
    .cta-button {
      display: inline-block;
      margin-top: 24px;
      padding: 14px 32px;
      background-color: #2e7d32;
      color: #ffffff;
      text-decoration: none;
      border-radius: 4px;
      font-size: 15px;
      font-weight: bold;
    }
    .divider {
      border: none;
      border-top: 1px solid #e0e0e0;
      margin: 32px 0;
    }
    .info-box {
      background-color: #f1f8e9;
      border-left: 4px solid #2e7d32;
      padding: 16px 20px;
      border-radius: 4px;
      margin: 24px 0;
    }
    .info-box p {
      margin: 4px 0;
      font-size: 14px;
    }
    .footer {
      background-color: #f9f9f9;
      padding: 20px 40px;
      text-align: center;
      border-top: 1px solid #e0e0e0;
    }
    .footer p {
      margin: 4px 0;
      font-size: 12px;
      color: #999999;
    }
    .footer a {
      color: #2e7d32;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="wrapper">

    <!-- Header -->
    <div class="header">
      <h1>🍕 PizzaApp</h1>
      <p>Fresh. Fast. Delicious.</p>
    </div>

    <!-- Body -->
    <div class="body">
      <h2>Welcome, <span class="highlight">${displayName}</span>!</h2>
      <p>
        We're thrilled to have you on board. Your account has been successfully created
        and you're ready to start ordering the best pizzas in town.
      </p>

      <div class="info-box">
        <p><strong>Username:</strong> ${username}</p>
        <p><strong>Email:</strong> ${email}</p>
      </div>

      <p>
        Browse our menu, customize your pizza, and enjoy fast delivery right to your door.
        Use the button below to explore what's waiting for you.
      </p>

      <a href="#" class="cta-button">Order Your First Pizza</a>

      <hr class="divider" />

      <p style="font-size: 13px; color: #888888;">
        If you did not create this account, please ignore this email or
        <a href="#" style="color: #2e7d32;">contact our support team</a>.
      </p>
    </div>

    <!-- Footer -->
    <div class="footer">
      <p>&copy; ${new Date().getFullYear()} PizzaApp. All rights reserved.</p>
      <p>
        <a href="#">Privacy Policy</a> &middot;
        <a href="#">Terms of Service</a> &middot;
        <a href="#">Unsubscribe</a>
      </p>
    </div>

  </div>
</body>
</html>
  `.trim();
};

module.exports = { welcomeTemplate };
