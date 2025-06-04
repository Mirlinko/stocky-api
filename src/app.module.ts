import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChartModule } from './modules/chart/chart.module';
import { FearAndGreedIndexModule } from './modules/fear-and-greed-index/fear-and-greed-index.module';
import { TickerMentionsModule } from './modules/ticker-mentions/ticker-mentions.module';

@Module({
  imports: [
    ChartModule, 
    FearAndGreedIndexModule, 
    TickerMentionsModule
  ],
  controllers: [
    AppController
  ],
  providers: [AppService],
})
export class AppModule {}
