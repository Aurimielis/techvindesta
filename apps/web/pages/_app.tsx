import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';
import { useEffect, useState } from "react";

function CustomApp({ Component, pageProps }: AppProps) {
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  if (!hasMounted) {
    return null
  }

  return (
    <>
      <Head>
        <title>Techvindesta 🔋</title>
      </Head>
      <main className="app">
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default CustomApp;
