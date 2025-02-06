import '../styles/globals.css';
import { TriviaProvider } from '../context/QuizContext';
import { ThemeProvider } from 'next-themes';
import Layout from '../components/Layout';

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
      </TriviaProvider>
    </ThemeProvider>
  );
}
