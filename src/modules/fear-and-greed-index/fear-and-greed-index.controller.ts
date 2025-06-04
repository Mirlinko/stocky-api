import { Controller, Get } from '@nestjs/common';
import { FearAndGreedIndexService } from './fear-and-greed-index.service';

@Controller('fear-and-greed-index')
export class FearAndGreedIndexController {
  constructor(
    private FearAndGreedIndexService: FearAndGreedIndexService
  ) { }

  @Get()
  async getTickerData() {
    const { data, error } = await this.FearAndGreedIndexService.getIndex();
  
    return { data, error };
  }
}
