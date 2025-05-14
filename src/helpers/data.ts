export function transformAlphaVantageToCandlestick(series: any): { time: string, open: number, high: number, low: number, close: number }[] {
  return Object.keys(series)
    .map(date => {
      const values = series[date];
      return {
        time: date,
        open: parseFloat(values['1. open']),
        high: parseFloat(values['2. high']),
        low: parseFloat(values['3. low']),
        close: parseFloat(values['4. close']),
      };
    })
    .sort((a, b) => a.time.localeCompare(b.time));
}

export function formatMetaData(meta: any): { [key: string]: string } {
  const mapping: Record<string, string> = {
    '1. Information': 'Information',
    '2. Symbol': 'Symbol',
    '3. Last Refreshed': 'Last Refreshed',
    '4. Output Size': 'Output Size',
    '5. Time Zone': 'Time Zone'
  };

  const result: Record<string, string> = {};

  Object.entries(mapping).forEach(([rawKey, displayKey]) => {
    if (meta[rawKey]) {
      result[displayKey] = meta[rawKey];
    }
  });

  return result;
}