import { ChainId, ThirdwebProvider } from '@thirdweb-dev/react';

import Head from 'next/head';
import '../styles/globals.css';
const activeChainId = ChainId.Polygon;

function MyApp({ Component, pageProps }) {
  return (
    <ThirdwebProvider desiredChainId={activeChainId}>
      <Head>
        <title>Summerjam</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, viewport-fit=cover"
        ></meta>
        <meta
          name="description"
          content="We equip your brand with the right opportunity, creativity, technology, and knowledge to ensure that your transition into the metaverse is as seamless as possible."
        ></meta>
      </Head>
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}

export default MyApp;
