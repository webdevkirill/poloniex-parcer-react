import React from "react";
import { useParams } from "react-router";
import Sidebar from "../../components/Sidebar/Sidebar";

const quotesPageLinks = {
  "/": "Главная",
};

export default function QuotesPage() {
  let { id } = useParams<{ id: string }>();
  return (
    <div>
      <div>
        <Sidebar links={quotesPageLinks} />
      </div>
    </div>
  );
}
