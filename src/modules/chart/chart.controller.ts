import { Controller, Get, Query, Req } from '@nestjs/common';
import { ChartService } from './chart.service';

@Controller('chart')
export class ChartController {
  constructor(
    private ChartService: ChartService
  ) {}

  @Get()
  async getTickerData(
    @Query('ticker') ticker: string
  ) {
    const { data, error } = await this.ChartService.getDataByTicker(ticker);

    return { data, error };
  }
}
