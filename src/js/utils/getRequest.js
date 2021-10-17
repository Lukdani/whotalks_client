import Axios from "axios";

const getRequest = async (url, protectedApi) => {
  const headersConfig = {};
  if (protectedApi) {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) headersConfig.Authorization = `Bearer ${accessToken}`;
  }
  try {
    const response = await Axios.get(url, { headers: headersConfig } || null);
    return response.data ? response.data : response;
  } catch (error) {
    console.log(error);
  }
};

export default getRequest;
