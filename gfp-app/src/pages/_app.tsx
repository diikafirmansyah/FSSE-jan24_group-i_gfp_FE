
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Footer from '@/pages/footer';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import '@/lib/fontawesome'; // Adjust the path as needed

config.autoAddCss = false;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <Component {...pageProps} />
      </div>
      <Footer />
    </div>
  );
}
