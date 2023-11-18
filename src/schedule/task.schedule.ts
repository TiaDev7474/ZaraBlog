import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { MailService } from '../mail/mail.service';
@Injectable()
export class TaskSchedule {
  private readonly logger = new Logger();

  constructor(private mailService: MailService) {}

  @Cron(CronExpression.EVERY_1ST_DAY_OF_MONTH_AT_MIDNIGHT)
  handleCron() {
    console.log('This is a cron job made every first day of the month');
  }
}
