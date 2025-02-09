import "@/styles/globals.css";
import { TriviaProvider } from "@/context/QuizContext";
import { ThemeProvider } from "next-themes";
import { PlayerProvider } from "@/context/PlayerContext"; // Importera PlayerProvider

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider
      attribute={"class"}
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      {/* PlayerProvider omsluter TriviaProvider för att dela spelardata */}
      <PlayerProvider>
        <TriviaProvider>
          <Component {...pageProps} />
        </TriviaProvider>
      </PlayerProvider>
    </ThemeProvider>
  );
}
