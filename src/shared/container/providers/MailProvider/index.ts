import { container } from 'tsyringe';

import 'dotenv/config';
import { S3StorageProvider } from '../StorageProvider/implementations/S3StorageProvider';
import { IMailProvider } from './IMailProvider';
import { EtherealMailProvider } from './implementations/EtherealMailProvider';

const mailProvider = {
  ethereal: container.resolve(EtherealMailProvider),
  ses: container.resolve(S3StorageProvider),
};

container.registerInstance<IMailProvider>(
  'MailProvider',
  mailProvider[process.env.MAIL_PROVIDER]
);
