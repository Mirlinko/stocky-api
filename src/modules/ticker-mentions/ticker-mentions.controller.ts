import { Controller, Get, Query } from '@nestjs/common';
import { TickerMentionsService } from './ticker-mentions.service';

@Controller('ticker-mentions')
export class TickerMentionsController {
  constructor(
    private TickerMentionsService: TickerMentionsService
  ) {}

  @Get()
  async getTickerData(
    @Query('ticker') ticker: string
  ) {
    const { data, error } = await this.TickerMentionsService.getMentions(ticker);
  
    return { data, error };
  }
}
