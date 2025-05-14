import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { ALPHA_VANTAGE_API_KEY } from 'src/constants/chart.constants';
import { formatMetaData, transformAlphaVantageToCandlestick } from 'src/helpers/data';

@Injectable()
export class ChartService {
  constructor(
    private HttpService: HttpService
  ) {}

  async getDataByTicker(ticker: string): Promise<any> {
    try {
      const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${ticker}&apikey=${ALPHA_VANTAGE_API_KEY}`;

      const { data } = await firstValueFrom(
        this.HttpService.get(url)
      );

      const dataToReturn = this.buildData(data);

      return { data: dataToReturn, error: undefined };
    } catch(error) {
      return { data: undefined,  error };
    }
  }

  private buildData(data: any) {
    const meta = data && data["Meta Data"];
    const chartData = data && data['Time Series (Daily)'];

    if (!meta || !chartData) return data;

    const transformedGeneralData = formatMetaData(data["Meta Data"]);
    const transformedChartData = transformAlphaVantageToCandlestick(chartData);

    const dataToReturn = {
      generalData: transformedGeneralData,
      chartData: transformedChartData
    }

    return dataToReturn;
  }
}
