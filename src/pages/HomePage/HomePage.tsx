import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";

const homePageLinks = {
  "/quotes/1": "Котировки 1",
  "/quotes/2": "Котировки 2",
};

export default function HomePage() {
  return (
    <div>
      <Sidebar links={homePageLinks} />
    </div>
  );
}
