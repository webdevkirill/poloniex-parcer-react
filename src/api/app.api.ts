import axios from "axios";

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

export function fetchData() {
  return new Promise<{ [key: string]: DataItemI }>((resolve, reject) => {
    try {
      axios
        .get("https://poloniex.com/public?command=returnTicker")
        .then((res) => res.data)
        .then((data) => resolve(data));
    } catch (err) {
      reject(err);
    }
  });
}
