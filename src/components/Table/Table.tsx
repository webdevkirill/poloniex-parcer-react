import React from "react";
import { DataI } from "../../api/app.api";
import { toggleQuote } from "../../store/reducers/api.reducer";
import { useAppDispatch } from "../../store/store";
import styles from "./Table.module.scss";

export interface TableI {
  headers: { [key: string]: string };
  data: DataI;
}

export default function Table({ headers, data }: TableI) {
  const headersKeys = Object.keys(headers);
  const dispatch = useAppDispatch();

  const handleRowClick = (id: number) => {
    dispatch(toggleQuote(id));
  };

  return (
    <div className={styles.table}>
      <div className={`${styles.table__row}`}>
        <div className={styles.table__cell}>Имя</div>
        {headersKeys.map((key) => (
          <div key={key} className={styles.table__cell}>
            {headers[key]}
          </div>
        ))}
      </div>
      {Object.keys(data).map((dataKey) => (
        <div
          key={dataKey}
          className={styles.table__row}
          onClick={() => {
            handleRowClick(data[dataKey].id);
          }}
        >
          <div className={styles.table__cell}>{dataKey}</div>
          {headersKeys.map((key) => (
            <div key={key} className={styles.table__cell}>
              {data[dataKey] && data[dataKey][key] ? data[dataKey][key] : "-"}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
