import { postPyApi } from "../services/python";


export default async function Login(req, res) {
  const { endPoint } = req.body;
  switch (endPoint) {
    case "postLogin":
      await postLogin(req, res);
      break;
    case "refreshToken":
      await postRefreshToken(req, res);
      break;
    case "postAzureLogin":
      await postAzureLogin(req, res);
      break;
    default:
      res.status(404).json({ message: "Endpoint Not Found" });
      break;
  }
}

async function postLogin(req, res) {
  try {
    const { data } = req.body;
    const rdata = await postPyApi("auth/token", data);
    res.setHeader(
      'Set-Cookie',
      `securedCookie=${rdata.data.accessToken}; HttpOnly; secure; Path=/;`
    );
    res.status(200).json(rdata);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function postRefreshToken(req, res) {
  try {
    const { data } = req.body;
    const rdata = await postPyApi("/auth/refreshtoken", data);
    res.status(200).json(rdata);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function postAzureLogin(req, res) {
  try {
    const { data } = req.body;
    const rdata = await postPyApi("/auth/adtoken", data);
    res.status(200).json(rdata);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
