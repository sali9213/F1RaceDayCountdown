import Row from "../Row/Row";
import styles from "./DriversTable.module.css"

const DriversTable = (props) => {
  const headings = ["Driver Name", "Points"];
  return (
    <div className={styles.table}>
      <Row isHeading={true} data={headings}/>
      {props.data.map((elem) => {
        const data = [];
        data.push(`${elem.Driver.givenName} ${elem.Driver.familyName}`);
        data.push(elem.points);
        return <Row className={styles.row} data={data}/>
      })}
    </div>
  );
};

export default DriversTable;
