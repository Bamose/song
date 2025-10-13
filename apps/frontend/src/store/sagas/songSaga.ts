import { call, put, takeLatest, all } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { Song, Statistics, SongFormData, SongFilters } from "@song-app/types";
import * as api from "../../services/api";
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
} from "../slices/songSlice";

function* fetchSongsSaga(action: PayloadAction<SongFilters | undefined>) {
  try {
    const songs: Song[] = yield call(api.fetchSongs, action.payload);
    yield put(fetchSongsSuccess(songs));
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
  } catch (error: any) {
    yield put(createSongFailure(error.message || "Failed to create song"));
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
    yield put(fetchStatisticsRequest());
  } catch (error: any) {
    yield put(updateSongFailure(error.message || "Failed to update song"));
  }
}

function* deleteSongSaga(action: PayloadAction<string>) {
  try {
    yield call(api.deleteSong, action.payload);
    yield put(deleteSongSuccess(action.payload));
    yield put(fetchStatisticsRequest());
  } catch (error: any) {
    yield put(deleteSongFailure(error.message || "Failed to delete song"));
  }
}

function* fetchStatisticsSaga() {
  try {
    const statistics: Statistics = yield call(api.fetchStatistics);
    yield put(fetchStatisticsSuccess(statistics));
  } catch (error: any) {
    yield put(
      fetchStatisticsFailure(error.message || "Failed to fetch statistics")
    );
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
