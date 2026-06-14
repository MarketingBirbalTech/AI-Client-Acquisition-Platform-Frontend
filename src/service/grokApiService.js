import axios from "axios";

const GROK_API_KEY = import.meta.env.VITE_GROK_API_KEY;
console.log("GROK_API_KEY:", GROK_API_KEY);

export const enrichLeadsWithGrok = async (profile) => {
  try {
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.3-70b-versatile",
        response_format: {
          type: "json_object",
        },
        messages: [
          {
            role: "system",
           content: `
You are a lead enrichment assistant.

The input is an array of LinkedIn profiles.

For EACH profile, extract:

- name
- designation
- companyName
- linkedinUrl

Return ONLY a JSON array.

Example:

[
  {
    "name": "",
    "designation": "",
    "companyName": "",
    "linkedinUrl": ""
  },
  {
    "name": "",
    "designation": "",
    "companyName": "",
    "linkedinUrl": ""
  }
]

Do not return markdown.
Do not return explanations.
`
          },
          {
            role: "user",
            content: JSON.stringify(profile),
          },
        ],
        temperature: 0,
      },
      {
        headers: {
          Authorization: `Bearer ${GROK_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return JSON.parse(response.data.choices[0].message.content);
  } catch (error) {
    console.error(
      "Grok API Error:",
      error.response?.data || error.message
    );
    console.log({GROK_API_KEY});
    throw error;
  }
};