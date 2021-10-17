import Axios from "axios";

const postRequest = async (url, protectedApi, data) => {
  const headersConfig = {};
  if (protectedApi) {
    const accessToken = localStorage.getItem("access_token");

    if (accessToken) headersConfig.Authorization = `Bearer ${accessToken}`;
    console.log(headersConfig);
  }
  try {
    const response = await Axios.post(
      url,
      data || null,
      { headers: headersConfig } || null
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export default postRequest;
