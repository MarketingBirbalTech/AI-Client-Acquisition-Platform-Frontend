import axios from "axios";

const SERPER_API_KEY = import.meta.env.VITE_SERPER_API_KEY;
const SERPER_BASE_URL = import.meta.env.VITE_SERPER_BASE_URL;

export const getLinkedInProfilesBySerper = async (
  jobTitle,
  industry,
  location,
  seniority
) => {
  try {
    const query = [
      "site:linkedin.com/in",
      jobTitle,
      industry,
      location,
      seniority,
    ]
      .filter(Boolean)
      .join(" ");

  

    const response = await axios.post(
      SERPER_BASE_URL,
      {
        q: query,
      },
      {
        headers: {
          "X-API-KEY": SERPER_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Serper API Error:",
      error.response?.data || error.message
    );
    throw error;
  }
};