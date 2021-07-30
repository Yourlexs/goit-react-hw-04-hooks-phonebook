import styles from './Filter.module.css';

const Filter = ({ value, onChange }) => (
  <label className={styles.label}>
    Find by name
    <input
      type="text"
      value={value}
      onChange={onChange}
      className={styles.input}
    ></input>
  </label>
);

export default Filter;
