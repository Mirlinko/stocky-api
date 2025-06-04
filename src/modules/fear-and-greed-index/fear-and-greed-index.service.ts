import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class FearAndGreedIndexService {
  lastQueryData: any;

  constructor(
    private HttpService: HttpService
  ) { }

  async getIndex() {
    try {
      if (this.lastQueryData) {
        return { data: this.lastQueryData, error: undefined };
      }

      const { data: response } = await firstValueFrom(
        this.HttpService.get("https://api.alternative.me/fng/")
      );

      const dataToReturn = response?.data[0];

      this.lastQueryData = dataToReturn;

      return { data: dataToReturn, error: undefined };
    } catch(error) {
      return { data: undefined,  error };
    }
  }
}
