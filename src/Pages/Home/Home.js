import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { debug } from "loglevel";
import Timer from "../../Components/Timer/Timer";
import styles from "./Home.module.css";
import DriversTable from "../../Components/DriversTable/DriversTable";
import ConstructorsTable from "../../Components/ConstructorsTable/ConstructorsTable";

const Home = (props) => {
  const [race, setRace] = useState({});
  const [raceTime, setRaceTime] = useState(new Date());
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(raceTime));
  const [constructorStandings, setConstructorStandings] = useState([]);
  const [driverStandings, setDriverStandings] = useState([]);
  const [showDrivers, setShowDrivers] = useState(true);
  const [showConstructors, setShowConstructors] = useState(false);

  const date = new Date();

  useEffect(() => {
    axios
      .get(`https://ergast.com/api/f1/current/next.json?limit=1&offset=0`)
      .then(
        (res) => {
          const r = res.data.MRData.RaceTable.Races[0];
          setRace(r);
          setRaceTime(new Date(r.date + "T" + r.time));
        },
        () => {
          console.log("Something went wrong while fetching data");
        }
      );
  }, []);

  useEffect(() => {
    axios
      .get("http://ergast.com/api/f1/current/driverStandings.json?offset=0")
      .then((res) => {
        setDriverStandings(
          res.data.MRData.StandingsTable.StandingsLists[0].DriverStandings
        );
      });
  }, []);

  useEffect(() => {
    axios
      .get("https://ergast.com/api/f1/current/constructorStandings.json")
      .then((res) => {
        setConstructorStandings(
          res.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings
        );
      });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft(raceTime));
    }, 1000);

    return () => clearTimeout(timer);
  });

  const handleDriverClick = useCallback(() => {
    setShowDrivers(true);
    setShowConstructors(false);
  }, []);

  const handleConstructorClick = useCallback(() => {
    setShowDrivers(false);
    setShowConstructors(true);
  }, []);

  return (
    <div>
      <div className={styles.timer}>
        <div className={styles.racename}>
          <h1>{race.raceName}</h1>
        </div>
        <div style={{ height: "100%" }}>
          <Timer timeLeft={timeLeft}></Timer>
        </div>
        *time to race
      </div>
      <h2>Standings</h2>
      <div className={styles.btnContainer}>
        <button
          onClick={handleDriverClick}
          className={`${styles.btn} ${showDrivers ? styles.btnSelected : ""}`}
        >
          Drivers
        </button>
        <button
          onClick={handleConstructorClick}
          className={`${styles.btn} ${
            showConstructors ? styles.btnSelected : ""
          }`}
        >
          Constructors
        </button>
      </div>
      <div className={styles.tableContainer}>
        <div
          className={`${styles.table} ${
            showDrivers ? styles.tableShow : styles.tableHide
          }`}
        >
          <DriversTable data={driverStandings}></DriversTable>
        </div>
        <div
          className={`${styles.table} ${
            showConstructors ? styles.tableShow : styles.tableHide
          }`}
        >
          <ConstructorsTable data={constructorStandings}></ConstructorsTable>
        </div>
      </div>
    </div>
  );
};

const calculateTimeLeft = (raceDate) => {
  let difference = raceDate - new Date();
  let timeLeft = {};

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  } else {
    timeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }
  return timeLeft;
};

export default Home;
