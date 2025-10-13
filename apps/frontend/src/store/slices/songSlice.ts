import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Song, Statistics, SongFormData, SongFilters } from "@song-app/types";

interface SongState {
  songs: Song[];
  statistics: Statistics | null;
  selectedSong: Song | null;
  filters: SongFilters;
  loading: boolean;
  error: string | null;
}

const initialState: SongState = {
  songs: [],
  statistics: null,
  selectedSong: null,
  filters: {},
  loading: false,
  error: null,
};

const songSlice = createSlice({
  name: "songs",
  initialState,
  reducers: {
    fetchSongsRequest: (
      state,
      action: PayloadAction<SongFilters | undefined>
    ) => {
      state.loading = true;
      state.error = null;
      if (action.payload) {
        state.filters = action.payload;
      }
    },
    fetchSongsSuccess: (state, action: PayloadAction<Song[]>) => {
      state.loading = false;
      state.songs = action.payload;
    },
    fetchSongsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    createSongRequest: (state, action: PayloadAction<SongFormData>) => {
      state.loading = true;
      state.error = null;
    },
    createSongSuccess: (state, action: PayloadAction<Song>) => {
      state.loading = false;
      state.songs.unshift(action.payload);
    },
    createSongFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    updateSongRequest: (
      state,
      action: PayloadAction<{ id: string; data: SongFormData }>
    ) => {
      state.loading = true;
      state.error = null;
    },
    updateSongSuccess: (state, action: PayloadAction<Song>) => {
      state.loading = false;
      const index = state.songs.findIndex(
        (song) => song._id === action.payload._id
      );
      if (index !== -1) {
        state.songs[index] = action.payload;
      }
      state.selectedSong = null;
    },
    updateSongFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    deleteSongRequest: (state, action: PayloadAction<string>) => {
      state.loading = true;
      state.error = null;
    },
    deleteSongSuccess: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.songs = state.songs.filter((song) => song._id !== action.payload);
    },
    deleteSongFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    fetchStatisticsRequest: (state) => {
      state.error = null;
    },
    fetchStatisticsSuccess: (state, action: PayloadAction<Statistics>) => {
      state.statistics = action.payload;
    },
    fetchStatisticsFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },

    selectSong: (state, action: PayloadAction<Song | null>) => {
      state.selectedSong = action.payload;
    },
    setFilters: (state, action: PayloadAction<SongFilters>) => {
      state.filters = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  fetchSongsRequest,
  fetchSongsSuccess,
  fetchSongsFailure,
  createSongRequest,
  createSongSuccess,
  createSongFailure,
  updateSongRequest,
  updateSongSuccess,
  updateSongFailure,
  deleteSongRequest,
  deleteSongSuccess,
  deleteSongFailure,
  fetchStatisticsRequest,
  fetchStatisticsSuccess,
  fetchStatisticsFailure,
  selectSong,
  setFilters,
  clearError,
} = songSlice.actions;

export default songSlice.reducer;
