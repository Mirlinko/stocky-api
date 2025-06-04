import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { FINNHUB_API_KEY } from 'src/constants/chart.constants';

@Injectable()
export class TickerMentionsService {
  lastQueryData: any;

  constructor(
    private HttpService: HttpService
  ) {}

  async getMentions(ticker: string) {
    try {
      if (this.lastQueryData) {
        return { data: this.lastQueryData, error: undefined };
      }

      const { data } = await firstValueFrom(
        this.HttpService.get(
          `https://finnhub.io/api/v1/stock/recommendation?symbol=${ticker}&token=${FINNHUB_API_KEY}`
        )
      );

      const dataToReturn = data[0];

      this.lastQueryData = dataToReturn;

      return { data: dataToReturn, error: undefined };
    } catch(error) {
      return { data: undefined,  error };
    }
  }
}
