const API_URL = process.env.NEXT_PUBLIC_API_URL
import axios from "axios";
import { PuzzleGrid } from "@/app/page";
import { Team } from "@/components/TeamSelectModal";

export const getTeams = async () => {
  const response = await axios.get<Team[]>(API_URL + `/api/v1/clubs`);
  return response;
};

export const getTodayGrid = async () => {
  const response = await axios.get<PuzzleGrid>(API_URL + `/api/v1/grids/today`);
  return response;
};