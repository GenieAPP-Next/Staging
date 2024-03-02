"use client";

import { createContext, useState, useEffect } from "react";
import SplashScreen from "../components/UI/splash-screen/splash-screen";

interface Props {
  children: React.ReactNode;
}

interface ProviderContextType {
  loading: boolean;
}

const initialContext: ProviderContextType = {
  loading: true,
};

const SplashScreenContext = createContext<ProviderContextType>(initialContext);

export default function SplashScreenProvider({ children }: Props) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2 * 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return <SplashScreenContext.Provider value={{ loading }}>{loading ? <SplashScreen /> : children}</SplashScreenContext.Provider>;
}
