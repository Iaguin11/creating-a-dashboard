
import { AppProvider } from "@/context/AppContext";
import AuthProvider from "@/context/AuthContext";
import { AppProps } from "next/app";

export default function MyApp({Component, pageProps}: AppProps) {
  return (
    <AuthProvider>
      <AppProvider>
        <Component {...pageProps}/>
      </AppProvider>
    </AuthProvider>
  )
}
