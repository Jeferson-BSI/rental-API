import { IMailProvider } from '../IMailProvider';

class MailProviderInMemory implements IMailProvider {
  private massage: any[] = [];

  async sendMail(
    to: string,
    subject: string,
    variables: any,
    path: string
  ): Promise<void> {
    this.massage.push({ to, subject, variables, path });
  }
}

export { MailProviderInMemory };
