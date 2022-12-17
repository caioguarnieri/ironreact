import styles from "./SpinnerLoading.module.css";

export const SpinnerLoading = () => {
  return (
    <div className={styles.loading}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};
