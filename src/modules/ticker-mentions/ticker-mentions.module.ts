import { Module } from '@nestjs/common';
import { TickerMentionsController } from './ticker-mentions.controller';
import { TickerMentionsService } from './ticker-mentions.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [TickerMentionsController],
  imports: [HttpModule],
  providers: [TickerMentionsService]
})
export class TickerMentionsModule {}
