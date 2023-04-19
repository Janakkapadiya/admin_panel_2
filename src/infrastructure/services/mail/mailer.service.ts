import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { EnvironmentConfigService } from 'src/infrastructure/config/environment-config/environment-config.service';

@Injectable()
export class MailerService {
  private readonly transport;

  constructor(private readonly emailConfig: EnvironmentConfigService) {
    this.transport = nodemailer.createTransport({
      host: this.emailConfig.getEmailHost(),
      port: this.emailConfig.getEmailPort(),
      secure: false,
      auth: {
        user: this.emailConfig.getEmailSender(),
        pass: this.emailConfig.getEmailSecret(),
      },
    });
  }

  async sendEmail(to: string, subject: string, body: string): Promise<boolean> {
    try {
      const mailOptions = {
        from: this.emailConfig.getEmailSender(),
        to,
        subject,
        text: body,
        html: body,
      };

      const info = await this.transport.sendMail(mailOptions);

      console.log('Message sent: %s', info.messageId);
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
      return true;
    } catch (err) {
      return false;
    }
  }
}
