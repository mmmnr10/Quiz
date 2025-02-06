import "@/styles/globals.css";
import { TriviaProvider } from "@/context/QuizContext";
import { ThemeProvider } from "next-themes";

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider 
    attribute={'class'}
    defaultTheme="dark"
    enableSystem
    disableTransitionOnChange  
    >  
  <TriviaProvider>
    <Component {...pageProps} />
  </TriviaProvider>
  </ThemeProvider>
    )
}
