import { useEffect, useState } from "react";
import styles from "./Row.module.css";

// data prop containing array of data
const Row = (props) => {
  const isHeading = props.isHeading;
  return (
    <div>
    <div className={`${styles.container} ${isHeading ? styles.heading : ''}`}>
        {props.data.map((elem) => (
          <div className={styles.cell}>{elem}</div>
        ))}
      </div>
    </div>
  );
};

export default Row;
