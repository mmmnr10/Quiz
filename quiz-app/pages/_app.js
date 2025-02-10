import '@/styles/globals.css';
import { TriviaProvider } from '../context/QuizContext';
import { ThemeProvider } from 'next-themes';
import { PlayerProvider } from '../pages/api/PlayerContext'; // Importera PlayerProvider
import { ResultProvider } from '../context/ResultContext'; // Importera ResultProvider

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider
      attribute={'class'}
      defaultTheme='dark'
      enableSystem
      disableTransitionOnChange
    >
      {/* PlayerProvider omsluter ResultProvider och TriviaProvider för att dela spelardata*/}
      <PlayerProvider>
        <ResultProvider>
          <TriviaProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
            <Toaster />
          </TriviaProvider>
        </ResultProvider>
      </PlayerProvider>
    </ThemeProvider>
  );
}
