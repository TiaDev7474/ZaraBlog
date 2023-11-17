import { S3Client, S3ClientConfig } from '@aws-sdk/client-s3';

export function createS3Client(options: S3ClientConfig): S3Client {
  return new S3Client(options);
}
