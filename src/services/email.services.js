require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.EMAIL_USER,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
  },
});


transporter.verify((error, success) => {
  if (error) {
    console.error('Error connecting to email server:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});

// Function to send email
const sendEmail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"Bank-Project" <${process.env.EMAIL_USER}>`, // sender address
      to, 
      subject, 
      text, 
      html, 
    });

    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

async function sendRegistrationEmail(userEmail, name){

    const subject = '💸 Welcome to Bank-Project';

    const text = `
Hello ${name},

Congratulations 🎉

Your account has been successfully created.

Sadly the millions in your account are imaginary 😭

YOU HAVE BEEN PRANKED 😎
`;

    const html = `
    <div 
        style="
            font-family: Arial, sans-serif;
            padding: 40px;
            color: white;
            text-align: center;
            background-image: url('https://images.unsplash.com/photo-1579621970795-87facc2f976');
            background-size: cover;
            background-position: center;
            border-radius: 15px;
        "
    >

        <div 
            style="
                background: rgba(0,0,0,0.7);
                padding: 30px;
                border-radius: 15px;
            "
        >

            <h1 style="font-size: 40px;">💸 BANK PROJECT 💸</h1>

            <h2>Hello ${name} 👋</h2>

            <p style="font-size: 18px;">
                Your account has been successfully created.
            </p>

            <p style="font-size: 20px;">
                Our AI-powered banking monkeys are processing your
                <b>₹999,99,99,999</b> transfer 🐒
            </p>

            <div 
                style="
                    margin-top: 25px;
                    background: rgba(255,255,255,0.15);
                    padding: 20px;
                    border-radius: 10px;
                "
            >
                <h3>✨ Premium Benefits</h3>

                <p>✔ Unlimited fake money</p>
                <p>✔ Emotional Damage Support</p>
                <p>✔ Free debugging depression</p>
            </div>

            <h1 style="margin-top: 35px; color: #00ff99;">
                😎 YOU HAVE BEEN PRANKED 😎
            </h1>

            <p style="margin-top: 20px;">
                Thanks for testing the project ❤️
            </p>

            <p>
                <b>— Bank-Project Team</b>
            </p>

        </div>
    </div>
    `;

    await sendEmail(userEmail, subject, text, html);
}
module.exports = {
  sendRegistrationEmail
};