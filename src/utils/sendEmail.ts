import nodemailer from 'nodemailer';
import  nodemailerConfig = require('./nodemailerConfig');

const sendEmail = async ({ to, subject, html }) => {
  let testAccount = await nodemailer.createTestAccount();

  //const transporter = nodemailer.createTransport(nodemailerConfig);

    const transporter = nodemailer.createTransport({
        host: 'smtp.office365.com',
        port: 587,
        auth: {
            user: 'user01@tskco.co.in',
            pass: 'Surya@7117'
        }
    });


// return  await transporter.sendMail({
//     from: '<augustyasharma@gmail.com>',
//     to,// list of receivers
//     subject,// Subject line
//     html, // html body
//   })

    return await transporter.sendMail({
        from: '"PMS" <user01@tskco.co.in>', // sender address
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
