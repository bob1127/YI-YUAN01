// pages/_app.js
import '../src/globals.css';
import { NextUIProvider } from '@nextui-org/react';
import { AuthProvider } from '../components/AuthProvider';
import { CartProvider } from "../components/context/CartContext";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
// ✅ 引入字體變數
import { bodoni, notoSerifTC } from '../lib/fonts';

function MyApp({ Component, pageProps }) {
  return (
    <div >
      <AuthProvider>
        <NextUIProvider>
          <CartProvider>
            <Component {...pageProps} />
          </CartProvider>
        </NextUIProvider>
      </AuthProvider>
    </div>
  );
}

export default MyApp;
