import axios from "axios";

const HUNTER_API_KEY = import.meta.env.VITE_HUNTER_API_KEY;

export const getEmail = async (fullName, domain) => {
  try {
    const [firstName, ...rest] = fullName.split(" ");
    const lastName = rest.join(" ");

    const response = await axios.get(
      "https://api.hunter.io/v2/email-finder",
      {
        params: {
          domain,
          first_name: firstName,
          last_name: lastName,
          api_key: HUNTER_API_KEY,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    console.error(
      "Hunter Email Finder Error:",
      error.response?.data || error.message
    );

    throw error;
  }
};