import { useEffect, useState } from 'react';

interface CurrencyData {
  name: string;
  value: string;
  decimal: number;
  interval_in_ms: number;
  changeMin: number;
  changeMax: number;
  interval: number;
  intervalString: number;
}

const useWebSocket = (url: string) => {
  const [data, setData] = useState<CurrencyData | null>(null);

  useEffect(() => {
    const ws = new WebSocket(url);

    ws.onmessage = (event) => {
      const parsedData: CurrencyData = JSON.parse(event.data);
      setData(parsedData);
    };

    return () => {
      ws.close();
    };
  }, [url]);

  return data;
};

export default useWebSocket;
