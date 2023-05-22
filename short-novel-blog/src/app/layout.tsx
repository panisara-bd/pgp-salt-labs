import { Inter } from 'next/font/google';
import NavBar from './nav-bar';

const inter = Inter({ subsets: ['latin'] });

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
      <body>
        <NavBar />
        <div>{children}</div>
      </body>
    </html>
  );
}
