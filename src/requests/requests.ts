const API_URL = process.env.NEXT_PUBLIC_API_URL

export const getTeams = async () => {
  const response = await fetch(API_URL + `/api/v1/clubs`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
};