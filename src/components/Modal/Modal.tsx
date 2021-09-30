import React, { useEffect } from "react";
import styles from "./Modal.module.scss";

export interface ModalI {
  title: string;
  children: React.ReactNode;
  onCancel: () => void;
}

export default function Modal({ children, title, onCancel }: ModalI) {
  const handleEscPress = (event: KeyboardEvent) => {
    if (event.key === `Escape`) {
      onCancel();
    }
  };

  useEffect(() => {
    document.addEventListener("keyDown", handleEscPress);
    return () => {
      document.removeEventListener("keyDown", handleEscPress);
    };
  });

  return (
    <div className={styles.modal__overlay} onClick={onCancel}>
      <div className={styles.modal__body} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modal__close} onClick={onCancel}>
          &#215;
        </div>
        <p className={styles.modal__title}>{title}</p>
        <div>{children}</div>
      </div>
    </div>
  );
}
