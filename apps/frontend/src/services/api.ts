import axios from "axios";
import { Song, Statistics, SongFormData, SongFilters } from "@song-app/types";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchSongs = async (filters?: SongFilters): Promise<Song[]> => {
  const { data } = await api.get("/songs", { params: filters });
  return data;
};

export const createSong = async (songData: SongFormData): Promise<Song> => {
  const { data } = await api.post("/songs", songData);
  return data;
};

export const updateSong = async (
  id: string,
  songData: SongFormData
): Promise<Song> => {
  const { data } = await api.put(`/songs/${id}`, songData);
  return data;
};

export const deleteSong = async (id: string): Promise<void> => {
  await api.delete(`/songs/${id}`);
};

export const fetchStatistics = async (): Promise<Statistics> => {
  const { data } = await api.get("/songs/stats");
  return data;
};
