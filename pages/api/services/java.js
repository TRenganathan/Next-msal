import { RefreshTokenService } from "@/components/tools/RefreshService/refreshservice";
import { GetRefreshTokenRR } from "@/pages/_app";
import { getDecryptedCookie, setEncryptedCookie } from "@/utils/cookiesData/cookiesdata";
import axios from "axios";
import Cookies from "js-cookie";
const javaAPIBaseURL = process.env.JAVA_API_BASE_URL;

const javaAPIDefaultURL = process.env.JAVA_API_DEFAULT_URL;

// Retrieve the token from localStorage
//const authToken = localStorage.getItem('accessToken');

const api = axios.create({
  baseURL: javaAPIBaseURL + javaAPIDefaultURL,
});

const authInterceptor = (config) => {
  if (typeof window !== "undefined") {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Basic_${accessToken}`;
    }
  }
  return config;
};

api.interceptors.request.use(authInterceptor);

/******Refresh token******/ 

const getCookies = getDecryptedCookie("userData");
const cookieData = getCookies ? JSON.parse(getCookies) : false;


const GetRefreshToken = async () => {
  const newData = {
    // refreshToken: cookieData?.refreshToken || 'aba2ec2d-2770-4155-92cb-756e45c99806',
    refreshToken:'aba2ec2d-2770-4155-92cb-756e45c99806',
  };
  const finalData = {
    data: newData,
    endPoint: "refreshToken",
  };
  try {
    const response = await api.post("/api/scm/login", finalData);
    if (response.data.statusCode === 200) {
      setLoginTime();
      setEncryptedCookie("userData", JSON.stringify(response.data.data));
      return response.data.data.accessToken;
    }

    if (response.data.statusCode === 401) {
      // Handle 401 or consider returning null to indicate refresh failure
      return null;
    }
  } catch (error) {
    // console.error("Error refreshing access token:", error);
    // Handle the error or consider returning null
    return null;
  }
};








axios.defaults.baseURL = javaAPIBaseURL + javaAPIDefaultURL;




let refresh = false
// api.interceptors.response.use(
//   (response) => {
//     console.log('HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH')
//     return response},
//   async (error) => {
//     const originalRequest = error.config;
    
//     if (error.response.status === 401 && !refresh) {
//       console.log(error,'RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR')
//       refresh  = true;

//       try {
//         // Attempt to refresh the access token
//         const newAccessToken = await GetRefreshToken();
//         console.log(newAccessToken,'QQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQ')
//         // Update the original request with the new access token
//         // api.headers.Authorization = `Bearer ${newAccessToken}`;
//         api.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;

//         // Retry the original request
//         const retryResponse = await api(originalRequest);
//         return retryResponse;
//       } catch (refreshError) {
//         // If refreshing the token fails, redirect to the login page or handle as needed
//         console.error("Error refreshing access token:", refreshError);
//         // You may want to redirect to the login page or handle the error in a different way
//         throw refreshError;
//       }
//     }
//     refresh = true;
//     return error;
//     return Promise.reject(error);
//   }
// );

api.interceptors.response.use(
  async (response) => {
    const t = await RefreshTokenService()
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !refresh) {

      refresh = true;

      try {
        // Attempt to refresh the access token
        const newAccessToken =  await RefreshTokenService();

        if (newAccessToken !== null) {
          // Update the original request with the new access token
          // api.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
          api.headers.Authorization = `Bearer ${newAccessToken}`
          // Retry the original request
          const retryResponse = await api(originalRequest);
          refresh = false; // Reset the refresh flag after a successful token refresh
          return retryResponse;
        } else {
          // Handle the case where token refresh fails
          // Redirect to login or handle accordingly
          throw new Error("Token refresh failed");
        }
      } catch (refreshError) {
        // If refreshing the token fails, redirect to the login page or handle as needed
        // console.error("Error refreshing access token:", refreshError);
        // You may want to redirect to the login page or handle the error in a different way
        throw refreshError;
      }
    }
    refresh = true;
    return Promise.reject(error);
    // return error
  }
);


function setLoginTime() {
  const loginTime = new Date().getTime();
  Cookies.set('loginTime', loginTime);
}













/*** end of refresh token***/ 
export const getApi = async (url, token) => {
  
  try {
    // let  headers;
    // if(loginType == 'AD'){
    //   headers = {
    //     Authorization: `AD ${token}`,
    //   };
    // }else {
    //   headers = {
    //     Authorization: `Bearer ${token}`,
    //   };
    // }
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await api.get(url, { headers });
    //const response = await api.get(url);
    return response.data;
  } catch (error) {
    // console.error(error);
    // throw new Error(error.message);
    throw error
  }
};

export const postApi = async (url, data, token) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    
    const response = await api.post(url, data, { headers });

    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};


export const postApiPayments = async (url, data, token) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json; charset=utf-8",
      "Content-Length": JSON.stringify(data).length.toString(),
    };
    const response = await api.post(url, data, { headers });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};

export const putApi = async (url, data, token) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await api.put(url, data, { headers });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};

export const putApiwH = async (url, data, token) => {
  try {
    const headers = {
      Authorization: `Basic_${token}`,
      "Content-Type": "application/json",
    };
    const response = await api.put(url, data, { headers });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};

export const deleteApi = async (url, token) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  try {
    const response = await api.delete(url, { headers });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};
