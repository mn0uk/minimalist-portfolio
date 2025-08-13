import '../styles/globals.css'
import { ThemeProvider } from '../contexts/ThemeContext'
import Head from 'next/head'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  var finalTheme = theme || (prefersDark ? 'dark' : 'light');
                  document.documentElement.className = finalTheme;
                } catch (e) {}
              })();
            `,
          }}
        />
      </Head>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}
