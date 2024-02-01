import { MsalProvider, useMsal } from "@azure/msal-react";
import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "@/utils/azureConfig/azureConfig";
export default function App({ Component, pageProps }) {
  const pca = new PublicClientApplication(msalConfig);
  const { instance, accounts,inProgress } = useMsal();
  return <>
   {/* <MsalProvider instance={pca}> */}
   <Component {...pageProps} />

   {/* </MsalProvider> */}
  </>
}
