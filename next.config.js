// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
// }
//139.99.114. 58 // ubuntu
//10.202.74. 80 // live
// 10.202.74. 73 secondary
// module.exports = nextConfig



/** @type {import('next').NextConfig} */
const nextConfig = {
  development: {
    javaAPI: {
      BASE_URL: "http://139.99.114.58:8900",
      DEFAULT_URL: "/scm/api/",
    },
    pythonAPI: {
      BASE_URL: "http://139.99.114.58:8900",
      DEFAULT_URL: "/scm/api/",
    },
    loginAPI: {
      BASE_URL: "http://139.99.114.58:8900",
      DEFAULT_URL: "/scm/api/",
    },
    ownAPI: {
      BASE_URL: "http://139.99.114.58:8900",
      DEFAULT_URL: "/api/",
    },
  },
  staging: {
    javaAPI: {
      BASE_URL: "http://139.99.114.58:8900",
      DEFAULT_URL: "/scm/api/",
    },
    pythonAPI: {
      BASE_URL: " http://139.99.114.58:8900",
      DEFAULT_URL: "/scm/api/",
    },
    loginAPI: {
      BASE_URL: "http://139.99.114.58:8900",
      DEFAULT_URL: "/scm/api/",
    },
    ownAPI: {
      BASE_URL: "http://139.99.114.58:8900",
      DEFAULT_URL: "/scm/api/",
    },
  },
  production: {
    javaAPI: {
      BASE_URL: "http://139.99.114.58:8900",
      DEFAULT_URL: "/scm/api/",
    },
    pythonAPI: {
      BASE_URL: "http://139.99.114.58:8900",
      DEFAULT_URL: "/scm/api/",
    },
    loginAPI: {
      BASE_URL: "http://139.99.114.58:8900",
      DEFAULT_URL: "/scm/api/",
    },
    ownAPI: {
      BASE_URL: "http://139.99.114.58:8900",
      DEFAULT_URL: "/scm/api/",
    },
  },
  reactStrictMode: true,
};

const envConfig = {
  JAVA_API_BASE_URL: nextConfig[process.env.NODE_ENV].javaAPI.BASE_URL,
  PYTHON_API_BASE_URL: nextConfig[process.env.NODE_ENV].pythonAPI.BASE_URL,
  OWN_API_BASE_URL: nextConfig[process.env.NODE_ENV].ownAPI.BASE_URL,
  LOGIN_API_BASE_URL: nextConfig[process.env.NODE_ENV].loginAPI.BASE_URL,

  JAVA_API_DEFAULT_URL: nextConfig[process.env.NODE_ENV].javaAPI.DEFAULT_URL,
  PYTHON_API_DEFAULT_URL:
    nextConfig[process.env.NODE_ENV].pythonAPI.DEFAULT_URL,
  OWN_API_DEFAULT_URL: nextConfig[process.env.NODE_ENV].ownAPI.DEFAULT_URL,
  LOGIN_API_DEFAULT_URL:
    nextConfig[process.env.NODE_ENV].loginAPI.DEFAULT_URL,
};

module.exports = {
  env: envConfig,
};
