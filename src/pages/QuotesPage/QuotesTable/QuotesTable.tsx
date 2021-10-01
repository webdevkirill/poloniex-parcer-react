import React from "react";
import { DataI } from "../../../api/app.api";
import Loader from "../../../components/Loader/Loader";
import Table from "../../../components/Table/Table";
import styles from "./QuotesTable.module.scss";

export interface QUotesTableI {
  data: DataI;
  loading: boolean;
}

export default function QuotesTable({ data, loading }: QUotesTableI) {
  return (
    <div className={styles["quotes-table"]}>
      <div className={styles["quotes-table__loader"]}>
        {loading && <Loader />}
      </div>
      <Table
        headers={{
          last: "Последняя цена",
          highestBid: "Самая высокая цена",
          percentChange: "Процент изменения",
        }}
        data={data}
      />
    </div>
  );
}
