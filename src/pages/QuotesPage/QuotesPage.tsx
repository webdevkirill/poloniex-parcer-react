import React, { useEffect, useRef } from "react";
import { useParams } from "react-router";
import styles from "./QuotesPage.module.scss";
import Sidebar from "../../components/Sidebar/Sidebar";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { apiState, fetchAPIData } from "../../store/reducers/api.reducer";

const quotesPageLinks = {
  "/": "Главная",
};

const quotesTabsLinks: { [key: string]: string } = {
  "1": "Котировки 1",
  "2": "Котировки 2",
};

export default function QuotesPage() {
  let { id } = useParams<{ id: string }>();
  const timerRef = useRef<ReturnType<typeof setInterval>>();
  const state = useAppSelector(apiState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAPIData(+id));
    timerRef.current = setInterval(() => {
      dispatch(fetchAPIData(+id));
    }, 5000);
    return () => {
      if (timerRef.current !== undefined) {
        clearInterval(timerRef.current);
      }
    };
  }, [id, dispatch]);

  console.log(state);

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
      </div>
    </div>
  );
}
