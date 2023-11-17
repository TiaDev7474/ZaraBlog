import { S3_Token } from '../common/s3.constant';
import { createS3Client } from '../common/s3.util';
import { ConfigService } from '@nestjs/config';

export const s3Provider = {
  provide: S3_Token,
  useFactory: (config: ConfigService) => {
    return createS3Client({
      region: config.get<string>('AWS_S3_REGION'),
      endpoint: config.get<string>('MINIO_S3_URL'),
      forcePathStyle: true,
      credentials: {
        accessKeyId: config.get<string>('AWS_S3_ACCESS_KEY'),
        secretAccessKey: config.get<string>('AWS_S3_SECRET_KEY'),
      },
    });
  },
  inject: [ConfigService],
};
