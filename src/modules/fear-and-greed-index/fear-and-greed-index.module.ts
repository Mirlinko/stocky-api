import { Module } from '@nestjs/common';
import { FearAndGreedIndexService } from './fear-and-greed-index.service';
import { HttpModule } from '@nestjs/axios';
import { FearAndGreedIndexController } from './fear-and-greed-index.controller';

@Module({
  providers: [FearAndGreedIndexService],
  imports: [HttpModule],
  controllers: [FearAndGreedIndexController],
})
export class FearAndGreedIndexModule {}
