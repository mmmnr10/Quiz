import '../styles/globals.css';
import { TriviaProvider } from '../context/QuizContext';
import { ThemeProvider } from 'next-themes';
import Layout from '../components/Layout';
import { Toaster } from '../components/ui/toaster';

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider
      attribute={'class'}
      defaultTheme='dark'
      enableSystem
      disableTransitionOnChange
    >
      <TriviaProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <Toaster />
      </TriviaProvider>
    </ThemeProvider>
  );
}
