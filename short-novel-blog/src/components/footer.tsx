import styles from './footerStyles.module.scss';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.newsLetterContainer}>
        <h4 className={styles.heading}>READ WHAT YOU LOVE</h4>
        <p className={styles.subHeading}>Subscribe to our newsletters and read awesome new stories</p>
        <form>
        <input placeholder="Your email adress" className={styles.newsLetterInput}/>
        <button type="submit" className={styles.newsLetterButton}>Subscribe</button>
        </form>
      </div>
      <div className={styles.aboutContainer}>
      <h4 className={styles.heading}>About</h4>
      <p className={styles.subHeading}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque pretium metus quis metus finibus vehicula. Praesent urna elit, egestas id porta vel, tempus sed magna.</p>
      </div>
    </footer>
  );
};

