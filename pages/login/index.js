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
import axios from "axios";
export async function getServerSideProps({ req, res }) {
	try {
		const Cookies = require('cookies')
		const cookies = new Cookies(req, res)
		const authToken = cookies.get('securedCookie') || ''
    console.log(authToken,"authToken")
    return { props: { initialLoginStatus: authToken} }
  }
  catch(e){
    return { props: { initialLoginStatus: `Logged in as ` } }
  }
}
const Login = ({initialLoginStatus}) => {
  if(initialLoginStatus){
    console.log(initialLoginStatus,"authToken")
  }
  const { instance, accounts } = useMsal();

  const router = useRouter();

  const signIn = async () => {
    instance
      .loginPopup({
        scopes: ["offline_access"],
        prompt: "consent",
      })
      .then((res) => {
        if (res.accessToken) {
          console.log(res.account, "ACQUIRETOKEN RESPONSE EMPTY res");
          console.log(accounts, "ACQUIRETOKEN RESPONSE EMPTY");
          acquireToken(res.account);
        }
      });
  };

  const acquireToken = async (account) => {
    try {
      const isADLoggedIn = accounts && accounts.length > 0;
      console.log(accounts, "ACQUIRETOKEN RESPONSE EMPTY");
      console.log(accounts, "ACQUIRETOKEN RESPONSE EMPTY");
      // if(isADLoggedIn){
      const response = await instance.acquireTokenSilent({
        scopes: ["offline_access", "openid", "profile", "User.Read"],
        account: account, // Use the first account, adjust as needed
      });

      console.log(response, "ACQUIRETOKEN RESPONSE");
      const refreshToken = response.accessToken;
      if (response.accessToken) {
        router.push("/surface/pedevices");
        setEncryptedCookie("userData", JSON.stringify(response.accessToken));
        Cookies.set("loginType", "AD");
      }
      // }
    } catch (error) {
      // Handle errors

      console.error("Error acquiring token silently:", error);
    }
  };

const [name, setName] = useState('')
const [email, setEmail] = useState('')
const [_id, setID] = useState('')
const [userData, setUserData] = useState([])
const hanldeSubmit = (e)=>{
  e.preventDefault()
  postLogin()
}

const handleEdit =  (e) => {
  e.preventDefault()
  // updateUser()
  deleteuser()
}
const updateUser = async () => {
  try {
    const newData = {name:'changed',email:'changed@gmail.com'}
    const id = '65cc947f4d79d4cdcd2fdfbd';

    const finalData= {
      userData: newData,
      id: id
    }
    const res = await axios.put(`/api/user/`, finalData)
    console.log(res.data);
  }
  catch(e){

  }
}
const deleteuser = async () => {
  try{
    const _id = '65ccb5ffbace6e457c6738b2';

    const newData = {
      _id: _id,
    };
    const finalData = {
      data: newData,
    };

    const res = await axios.delete('/api/user',finalData)
    fetchUser()
  }
  catch(e){

  }
}
const fetchUser = async ()=>{
  try{
    const {data} = await axios.get('/api/user')
    console.log(data,'RRR')
    if(data){
      setUserData(data.data)
    }
  }
  catch(e) {

  }
}

const postLogin = async () => {
  try {
    const newData = { name:name, email:email,};
    const response = await axios.post("/api/user",newData);
    fetchUser()
  } catch (error) {
    console.error(error);
  }
};
  return (
    <>
      <form onSubmit={hanldeSubmit}>
      <input type="text" name="name" onChange={(e)=>setName(e.target.value)}/>
      <input type="text" name="password" onChange={(e)=>setEmail(e.target.value)}/>
      <button type="submit">sign in</button>
      </form>
      {userData.length && 
      
      <ul>
        {userData.map((user)=>(
          <li>{user._id} : {user.name}</li>
        ))}
      </ul>
      }

      <form onSubmit={handleEdit}>
        <input type="text" name="name" onChange={(e)=>setName(e.target.value)}/>
        <input type="text" name="password" onChange={(e)=>setEmail(e.target.value)}/>
        <button type="submit">update user</button>
      </form>
    </>
  );
};
export default Login;
