import { Module } from '@nestjs/common';
import { StorageService } from './storage.service';
import { s3Provider } from '../provider/s3.provider';

@Module({
  providers: [StorageService, s3Provider],
  exports: [StorageService],
})
export class StorageModule {}
