import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { ALPHA_VANTAGE_API_KEY, TIME_SERIES } from 'src/constants/chart.constants';
import { formatMetaData, transformAlphaVantageToCandlestick } from 'src/helpers/data';

@Injectable()
export class ChartService {
  lastQueryData: any;

  constructor(
    private HttpService: HttpService
  ) {}

  async getDataByTicker(ticker: string): Promise<any> {
    try {
      if (this.lastQueryData) {
        return { data: this.lastQueryData, error: undefined };
      }

      const url = this.getTimeSeriesUrl(TIME_SERIES.DAILY, ticker);

      const { data } = await firstValueFrom(
        this.HttpService.get(url)
      );

      const dataToReturn = this.buildData(data);

      this.lastQueryData = dataToReturn;

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

  private getTimeSeriesUrl(series: string, ticker: string) {
    switch(series) {
      case TIME_SERIES.DAILY: 
        return `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${ticker}&outputsize=full&apikey=${ALPHA_VANTAGE_API_KEY}`;
    }
  }
}
