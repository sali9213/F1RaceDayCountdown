import Row from "../Row/Row"
import styles from "./ConstructorsTable.module.css"

const ConstructorsTable = (props) => {
  const headings = ["Constructor Name", "Points"];
  return (
    <div className={styles.table}>
      <Row isHeading={true} data={headings} />
      {props.data.map((elem) => {
        const data = [];
        data.push(elem.Constructor.name);
        data.push(elem.points);
        return <Row className={styles.row} data={data} />;
      })}
    </div>
  );
};

export default ConstructorsTable;
