import styles from './FullPageSpinner.module.css';

const FullPageSpinner = () => (
  <div className={styles.container}>
    <div className={styles.spinner} />
  </div>
);

export default FullPageSpinner;