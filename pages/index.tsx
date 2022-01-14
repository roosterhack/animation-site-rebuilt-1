import { Footer } from "components/Footer";
import { HomeAbout } from "components/homePage/HomeAbout";
import { HomeBanner } from "components/homePage/HomeBanner";
import { HomeFeature } from "components/homePage/HomeFeature";
import type { NextPage } from "next";
import { HomeContent } from "../components/homePage/HomeContent";

const Home: NextPage = () => {
  return (
    <>
      <HomeBanner />
      <HomeContent />
      <HomeFeature />
      <HomeAbout />
    </>
  );
};

export default Home;
