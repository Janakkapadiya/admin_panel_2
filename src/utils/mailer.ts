import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

const config = new ConfigService();

const transport = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'amirsohel.as10@gmail.com',
    pass: config.get('EMAIL_SECRET'),
  },
});

export async function sendEmail(to: string, subject: string, body: string) {
  try {
    const mailOptions = {
      from: 'amirsohel.as10@gmail.com', // sender address
      to, // list of receivers
      subject, // Subject line
      text: body, // plaintext body
      html: body, // html body
    };

    // send mail with defined transport object
    const info = await transport.sendMail(mailOptions);

    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    return true;
  } catch (err) {
    return false;
  }
}
