import OnBoardings from "@/components/OnBoarding/onboardings";
import SplashScreenProvider from "@/context/splash-screen-provider";

export default function Home() {
  return (
    <>
      <SplashScreenProvider>
        <OnBoardings />
      </SplashScreenProvider>
    </>
  );
}
