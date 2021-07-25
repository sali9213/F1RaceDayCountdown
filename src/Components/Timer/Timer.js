import styles from "./Timer.module.css";

const Timer = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.timeContainer}>
          {props.timeLeft.days} <span className={styles.unit}>days</span>
      </div>
      <div className={styles.timeContainer}>
          {props.timeLeft.hours} <span className={styles.unit}>hours</span>
      </div>
      <div className={styles.timeContainer}>
          {props.timeLeft.minutes} <span className={styles.unit}>minutes</span>
      </div>
      <div className={styles.timeContainer}>
          {props.timeLeft.seconds} <span className={styles.unit}>seconds</span>
      </div>
    </div>
  );
};

export default Timer;
