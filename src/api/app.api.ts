import axios from "axios";

export interface DataI {
  [propName: string]: DataItemI;
}
export interface DataItemI {
  id: number;
  last: string;
  lowestAsk: string;
  highestBid: string;
  percentChange: string;
  baseVolume: string;
  quoteVolume: string;
  isFrozen: string;
  postOnly: string;
  high24hr: string;
  low24hr: string;
}

export function fetchData(apiId: number) {
  return new Promise<DataI>((resolve, reject) => {
    try {
      axios
        .get("https://poloniex.com/public?command=returnTicker")
        .then((res) => res.data)
        .then((data: DataI) => {
          const dataKeys = Object.keys(data);
          const dataLength = dataKeys.length;
          let slicedDataKeys: string[];

          if (apiId === 1) {
            slicedDataKeys = dataKeys.slice(0, Math.ceil(dataLength / 2));
          } else if (apiId === 2) {
            slicedDataKeys = dataKeys.slice(
              Math.ceil(dataLength / 2),
              dataLength,
            );
          } else {
            throw new Error("Неверный индекс страницы");
          }

          const slicedData: DataI = slicedDataKeys.reduce(
            (acc, key) => ({ ...acc, [key]: data[key] }),
            {},
          );
          resolve(slicedData);
        });
    } catch (err) {
      reject(err);
    }
  });
}
