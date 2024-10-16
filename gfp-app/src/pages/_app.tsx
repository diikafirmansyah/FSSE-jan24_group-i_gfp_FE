
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Footer from '@/components/footer';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import '@/lib/fontawesome'; 
import Navbar from '@/components/navbar'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
config.autoAddCss = false;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow">
        <Component {...pageProps} />
        <ToastContainer />
      </div>
      <Footer />
    </div>
  );
}
