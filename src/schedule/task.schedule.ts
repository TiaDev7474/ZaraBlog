import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
@Injectable()
export class TaskSchedule {
  private readonly logger = new Logger();

  @Cron(CronExpression.EVERY_10_MINUTES)
  handleCron() {
    this.logger.debug(`I am a cron job`);
  }
}
