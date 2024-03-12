import axios from 'axios';


const pythonAPIBaseURL = process.env.PYTHON_API_BASE_URL;
const pythonAPIDefaultURL = process.env.PYTHON_API_DEFAULT_URL;

const loginAPIBaseURL = process.env.LOGIN_API_BASE_URL;
const loginAPIDefaultURL = process.env.LOGIN_API_DEFAULT_URL;

const api = axios.create({
  baseURL: pythonAPIBaseURL+pythonAPIDefaultURL,
});

const apiLogin = axios.create({
  baseURL: loginAPIBaseURL+loginAPIDefaultURL,
});

const authInterceptor = (config) => {
    if (typeof window !== 'undefined') {
      const accessToken = localStorage.getItem('accessToken');
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }
    return config;
  };

api.interceptors.request.use(authInterceptor);

const authInterceptorOwn = (config) => {
  if (typeof window !== 'undefined') {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
  }
  return config;
};

apiLogin.interceptors.request.use(authInterceptorOwn);


export const postPyApi = async (url, data) => {
  try {
    
    const response = await apiLogin.post(url, data);
    
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};
