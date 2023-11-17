import { Inject } from '@nestjs/common';
import { S3_Token } from '../../common/s3.constant';

export function InjectS3() {
  return Inject(S3_Token);
}
