const API_URL = process.env.NEXT_PUBLIC_API_URL

console.log(API_URL)

export const getTeams = async () => {
  const token = localStorage.getItem("token");
  const response = await fetch(API_URL + `/api/v1/clubs`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
  });
  const data = await response.json();
  return data;
};