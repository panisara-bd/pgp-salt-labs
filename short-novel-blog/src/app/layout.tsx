import { Footer } from '@/components/Footer';
import styles from './globalStyles.module.scss';
import Header from '@/components/Header';

export const metadata = {
  title: 'Short Novel Blog',
  description: 'Code test project through Salt PGP program',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={styles.body}>
        <Header />
        <div className={styles.children}>{children}</div>
        <Footer />
      </body>
    </html>
  );
}
