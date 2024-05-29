import React, { useState, useEffect } from 'react';
import useWebSocket from '../hooks/useWebSocket';
import CurrencyChart from '../components/CurrencyChart';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

interface CurrencyData {
  name: string;
  value: string;
  decimal: number;
  interval_in_ms: number;
}

const Home: React.FC = () => {
  const [currencyData, setCurrencyData] = useState<{ [key: string]: { time: number, value: number }[] }>({});
  const data = useWebSocket('ws://localhost:5050/ws'); 
  useEffect(() => {
    if (data) {
      const { name, value, decimal } = data;
      const parsedValue = parseFloat(value) / Math.pow(10, decimal);
      setCurrencyData((prevData) => {
        const newData = { ...prevData };
        if (!newData[name]) {
          newData[name] = [];
        }
        newData[name].push({ time: Date.now(), value: parsedValue });
        return newData;
      });
    }
  }, [data]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Currency Charts</title>
        <meta name="description" content="Live currency charts with WebSocket" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Currency Charts</h1>
        {Object.keys(currencyData).map((name) => (
          <CurrencyChart key={name} data={currencyData[name]} name={name} />
        ))}
      </main>
    </div>
  );
};

export default Home;
