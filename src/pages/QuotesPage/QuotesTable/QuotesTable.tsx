import React from "react";
import { DataI } from "../../../api/app.api";
import Table from "../../../components/Table/Table";

export interface QUotesTableI {
  data: DataI;
}

export default function QuotesTable({ data }: QUotesTableI) {
  return (
    <div>
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
