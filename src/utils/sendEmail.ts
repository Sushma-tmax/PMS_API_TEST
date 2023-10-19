import nodemailer from 'nodemailer';
import  nodemailerConfig = require('./nodemailerConfig');

const sendEmail = async ({ to, cc, subject, html }) => {
  let testAccount = await nodemailer.createTestAccount();

  //const transporter = nodemailer.createTransport(nodemailerConfig);

    const transporter = nodemailer.createTransport({
        host: 'smtp.office365.com',
        port: 587,
        auth: {
            user: 'do-not-replyemail@taqeef.com',
            // pass: 'Nah19349'
            pass: 'Vuk08852'
        }
    });


// return  await transporter.sendMail({
//     from: '<augustyasharma@gmail.com>',
//     to,// list of receivers
//     subject,// Subject line
//     html, // html body
//   })

    return await transporter.sendMail({
        from: '"PMS" <do-not-replyemail@taqeef.com>', // sender address
        to, // list of receivers
        cc,
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
