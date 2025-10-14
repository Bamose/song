import { call, put, takeLatest, all, select } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import type {
  Song,
  Statistics,
  SongFormData,
  SongFilters,
  PaginatedSongs,
  PaginationMeta,
} from "@song-app/types";
import * as api from "../../services/api";
import { toast } from "../../components/Toast";
import {
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
  type FetchSongsPayload,
} from "../slices/songSlice";
import type { RootState } from "..";

function* fetchSongsSaga(action: PayloadAction<FetchSongsPayload | undefined>) {
  try {
    const currentFilters: SongFilters = yield select(
      (state: RootState) => state.songs.filters
    );
    const payload = action.payload ?? {};
    const { silent: _silent, ...incomingFilters } = payload;
    const requestFilters =
      Object.keys(incomingFilters).length > 0
        ? { ...currentFilters, ...incomingFilters }
        : currentFilters;
    const sanitizedFilters = Object.entries(requestFilters).reduce(
      (acc, [key, value]) => {
        if (value !== undefined && value !== null) {
          acc[key as keyof SongFilters] = value as never;
        }
        return acc;
      },
      {} as SongFilters
    );
    const response: PaginatedSongs = yield call(
      api.fetchSongs,
      sanitizedFilters
    );
    yield put(fetchSongsSuccess(response));
    yield put(fetchStatisticsRequest());
  } catch (error: any) {
    yield put(fetchSongsFailure(error.message || "Failed to fetch songs"));
  }
}

function* createSongSaga(action: PayloadAction<SongFormData>) {
  try {
    const song: Song = yield call(api.createSong, action.payload);
    yield put(createSongSuccess(song));
    yield put(fetchStatisticsRequest());
    toast("Song created successfully", "success");
  } catch (error: any) {
    const message = error?.message || "Failed to create song";
    yield put(createSongFailure(message));
    toast(message, "error");
  }
}

function* updateSongSaga(
  action: PayloadAction<{ id: string; data: SongFormData }>
) {
  try {
    const song: Song = yield call(
      api.updateSong,
      action.payload.id,
      action.payload.data
    );
    yield put(updateSongSuccess(song));
    yield put(fetchSongsRequest({ silent: true }));
    toast("Song updated successfully", "success");
  } catch (error) {
    const message = "Failed to update song";
    yield put(updateSongFailure(message));
    toast(message, "error");
  }
}

function* deleteSongSaga(action: PayloadAction<string>) {
  try {
    yield call(api.deleteSong, action.payload);
    yield put(deleteSongSuccess(action.payload));
    toast("Song deleted successfully", "success");
    const {
      songs,
      pagination,
    }: {
      songs: Song[];
      pagination: PaginationMeta | null;
    } = yield select((state: RootState) => ({
      songs: state.songs.songs,
      pagination: state.songs.pagination,
    }));

    if (pagination && songs.length === 0 && pagination.page > 1) {
      yield put(
        fetchSongsRequest({
          page: pagination.page,
          silent: true,
        })
      );
    } else {
      yield put(fetchSongsRequest({ silent: true }));
    }
  } catch (error) {
    const message = "Failed to delete song";
    yield put(deleteSongFailure(message));
    toast(message, "error");
  }
}

function* fetchStatisticsSaga() {
  try {
    const statistics: Statistics = yield call(api.fetchStatistics);
    yield put(fetchStatisticsSuccess(statistics));
  } catch (error) {
    yield put(fetchStatisticsFailure("Failed to fetch statistics"));
  }
}

export default function* songSaga() {
  yield all([
    takeLatest(fetchSongsRequest.type, fetchSongsSaga),
    takeLatest(createSongRequest.type, createSongSaga),
    takeLatest(updateSongRequest.type, updateSongSaga),
    takeLatest(deleteSongRequest.type, deleteSongSaga),
    takeLatest(fetchStatisticsRequest.type, fetchStatisticsSaga),
  ]);
}
