import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import styles from "./QuotesPage.module.scss";
import Sidebar from "../../components/Sidebar/Sidebar";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { apiState, fetchAPIData } from "../../store/reducers/api.reducer";
import QuotesTable from "./QuotesTable/QuotesTable";

const quotesPageLinks = {
  "/": "О приложении",
};

const quotesTabsLinks: { [key: string]: string } = {
  "1": "Котировки 1",
  "2": "Котировки 2",
};

export default function QuotesPage() {
  let { id } = useParams<{ id: string }>();
  const state = useAppSelector(apiState);
  const dispatch = useAppDispatch();

  const timerRef = useRef<ReturnType<typeof setInterval>>();
  const [isTimerStarted, setIsTimerStarted] = useState(false);

  useEffect(() => {
    dispatch(fetchAPIData(+id));
  }, [dispatch, id]);

  useEffect(() => {
    if (state.openedQuote === null) {
      if (!isTimerStarted) {
        timerRef.current = setInterval(() => {
          dispatch(fetchAPIData(+id));
        }, 5000);
      }
    } else {
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current !== undefined) {
        clearInterval(timerRef.current);
      }
      setIsTimerStarted(false);
    };
  }, [state.openedQuote, isTimerStarted, id, dispatch]);

  return (
    <div>
      <Sidebar links={quotesPageLinks} />
      <div className={styles.quotes}>
        <div className={styles.tabs}>
          {Object.keys(quotesTabsLinks).map((key) => (
            <Link
              key={key}
              to={`/quotes/${key}`}
              className={`${styles.tabs__item} ${
                key === id ? styles.tabs__item_active : ""
              }`}
            >
              {quotesTabsLinks[key]}
            </Link>
          ))}
        </div>
        <QuotesTable data={state.data} />
      </div>
    </div>
  );
}
