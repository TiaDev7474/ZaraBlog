import { Injectable } from '@nestjs/common';
import { InjectS3 } from '../lib/decorator/s3.decorator';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

@Injectable()
export class StorageService {
  constructor(@InjectS3() private s3Client: S3Client) {}
  async upload(filename: string, buffer: any, bucketname: string) {
    return this.s3Client.send(
      new PutObjectCommand({
        Bucket: bucketname,
        Key: filename,
        Body: buffer,
      }),
    );
  }
}
