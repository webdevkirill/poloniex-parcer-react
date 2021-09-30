import React from "react";
import { DataItemI } from "../../../api/app.api";
import styles from "./QuoteModalInfo.module.scss";

export interface QuoteModalInfoI {
  data: DataItemI;
}

export default function QuoteModalInfo({ data }: QuoteModalInfoI) {
  return (
    <div className={styles["quote-modal"]}>
      {Object.keys(data).map(
        (prop) =>
          prop !== "id" && (
            <p key={prop} className={styles["quote-modal__item"]}>
              {prop}: {data[prop]}
            </p>
          ),
      )}
    </div>
  );
}
