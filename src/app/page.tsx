import Navbar from "@/components/Navbar/Navbar";
import SplashScreenProvider from "@/context/splash-screen-provider";
// localhost:3000/

export default function Home() {
  return (
    <>
      <SplashScreenProvider>
        <Navbar pageTitle="Genie" />
        {/* <CreateGroupForm /> */}
        {/* <SplashScreen /> */}
      </SplashScreenProvider>
    </>
  );
}
