import React from "react";
import { Link } from "react-router-dom";
import styles from "./Sidebar.module.scss";

interface SidebarProps {
  links: { [key: string]: string };
}

export default function Sidebar({ links }: SidebarProps) {
  return (
    <div className={styles.sidebar}>
      {Object.keys(links).map((link) => (
        <Link key={link} to={link} className={styles.link}>
          {links[link]}
        </Link>
      ))}
    </div>
  );
}
