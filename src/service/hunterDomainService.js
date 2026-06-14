import axios from "axios";

const HUNTER_API_KEY = import.meta.env.VITE_HUNTER_API_KEY;

export const getCompanyDomain = async (companyName) => {
  try {
    const response = await axios.get(
      "https://api.hunter.io/v2/domain-search",
      {
        params: {
          company: companyName,
          api_key: HUNTER_API_KEY,
        },
      }
    );

    return response.data.data.domain;
  } catch (error) {
    console.error(
      "Hunter Domain Search Error:",
      error.response?.data || error.message
    );

    throw error;
  }
};