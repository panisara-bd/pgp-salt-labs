import { Header } from '@/components/Header';
import { CartContextProvider } from '@/helpers/CartContext';
import { colors } from '@/helpers/colors';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import styled from 'styled-components';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>The Milk Store</title>
        <meta
          name="description"
          content="The shop that sells many kinds of milk"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <CartContextProvider>
        <Header />
        <PageWrapper>
          <Component {...pageProps} />
        </PageWrapper>
      </CartContextProvider>
    </>
  );
}

const PageWrapper = styled.main`
  display: flex;
  justify-content: center;
  min-height: 80vh;
  padding-block: 80px;
  background-color: ${colors.lightPink};
`;
