
import React, { useEffect, useState } from "react";

import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal,
} from "@azure/msal-react";
import { Router, useRouter } from "next/router";

// import  Jwt  from 'jsonwebtoken';
import {
  EventType,
  InteractionRequiredAuthError,
  PublicClientApplication,
} from "@azure/msal-browser";



const Login = () => {
 
  const { instance, accounts } = useMsal();
 
  const router = useRouter();

  const signIn = async () => {
    instance
      .loginPopup({
        // scopes: ["User.Read",'offline_access','profile','openid','email',  ],
        scopes: ['offline_access'],
        prompt: 'consent',
        // scopes: loginRequest,

      })
      .then((res) => {
        if (res.accessToken) {
          
          // router.push("/surface/pedevices")
          // setEncryptedCookie("userData", JSON.stringify(res.accessToken));
          console.log(res.account,'ACQUIRETOKEN RESPONSE EMPTY res')
          console.log(accounts,'ACQUIRETOKEN RESPONSE EMPTY')
          acquireToken(res.account)
        }

        // callMsGraph(graphConfig.graphMeEndpoint, res.accessToken).then(
        //   (response) =>
        //     console.log(response, "AD RESPONCE")
        // );
      });
  };



  const acquireToken = async (account) => {
    try {
      const isADLoggedIn = accounts && accounts.length > 0;
      console.log(accounts,'ACQUIRETOKEN RESPONSE EMPTY')
      console.log(accounts,'ACQUIRETOKEN RESPONSE EMPTY')
      // if(isADLoggedIn){
        const response = await instance.acquireTokenSilent({
          scopes: ['offline_access','openid', 'profile','User.Read'],
          account: account // Use the first account, adjust as needed
        });
       
        console.log(response,'ACQUIRETOKEN RESPONSE')
        const refreshToken = response.accessToken; 
        if(response.accessToken){
          router.push("/surface/pedevices")
          setEncryptedCookie("userData", JSON.stringify(response.accessToken));
          Cookies.set('loginType','AD')
        }
      // }
      
    } catch (error) {
      
      // Handle errors

      console.error('Error acquiring token silently:', error);
    }
  }



/******  REFRESH TOKEN FUNC  ******/ 

/******  END REFRESH TOKEN FUNC  ******/ 
  return (
   <>
      <UnauthenticatedTemplate>
              <button onClick={signIn}>
                Sign in
              </button>
            </UnauthenticatedTemplate>
            <AuthenticatedTemplate>
              <button>
                
              </button>
            </AuthenticatedTemplate>
   </>
  );
};
export default Login;
