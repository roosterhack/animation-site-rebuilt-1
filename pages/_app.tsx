import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import BasicLayout from "../components/layout/Basic";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <BasicLayout>
        <Component {...pageProps} />
      </BasicLayout>
    </RecoilRoot>
  );
}

export default MyApp;
