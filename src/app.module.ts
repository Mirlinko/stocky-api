import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChartModule } from './modules/chart/chart.module';

@Module({
  imports: [ChartModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
