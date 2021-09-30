import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import styles from "./HomePage.module.scss";

const homePageLinks = {
  "/quotes/1": "Котировки 1",
  "/quotes/2": "Котировки 2",
};

export default function HomePage() {
  return (
    <div>
      <Sidebar links={homePageLinks} />
      <div className={styles.homepage}>
        <p className={styles.homepage__header}>
          Парсер{" "}
          <a
            href="https://docs.poloniex.com/#introduction"
            target="_blank"
            rel="noreferrer"
            className={styles.homepage__link}
          >
            docs.poloniex.com
          </a>
        </p>
      </div>
    </div>
  );
}
