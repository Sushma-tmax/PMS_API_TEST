import nodemailer from 'nodemailer';
import  nodemailerConfig = require('./nodemailerConfig');

const sendEmail = async ({ to, subject, html }) => {
  let testAccount = await nodemailer.createTestAccount();

  //const transporter = nodemailer.createTransport(nodemailerConfig);

  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'tyrell.rippin51@ethereal.email', // generated ethereal user
      pass: 'XN4VYt8J5cAdzJE9ct' // generated ethereal password
    },
  });


// return  await transporter.sendMail({
//     from: '<augustyasharma@gmail.com>',
//     to,// list of receivers
//     subject,// Subject line
//     html, // html body
//   })

    return await transporter.sendMail({
        from: '"PMS" <augustya.s@tmax.in>', // sender address
        to, // list of receivers
        subject, // Subject line
        html, // html body
    });


  // return testAccount.sendMail({
  //   from: '"PMS" <augustyasharma@gmail.com>', // sender address
  //   to,
  //   subject,
  //   html,
  // });
};

export default sendEmail;
