import '../styles/globals.css'
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <>
      {/* Add the favicon */}
      <Head>
        <link rel="shortcut icon" href="/s.jpg" />
      </Head>
      {/* Add the favicon */}
      {/* Note that the path doesn't include "public" */}

      <Component {...pageProps} />
    </>
  );
}

export default MyApp;