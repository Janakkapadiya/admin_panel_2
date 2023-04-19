export interface EmailConfig {
  getEmailSecret(): string;
  getEmailHost(): string;
  getEmailPort(): number;
  getEmailSender(): string;
}
