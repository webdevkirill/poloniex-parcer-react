import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DataItemI, fetchData } from "../../api/app.api";
import { RootState } from "../store";

export interface DataState {
  data: { [key: string]: DataItemI };
  status: "idle" | "loading" | "failed";
  error: any;
  openedQuote: null | number;
}

const initialState: DataState = {
  data: {},
  status: "idle",
  error: "",
  openedQuote: null,
};

export const fetchAPIData = createAsyncThunk(
  "api/fetchData",
  async (apiId: number) => {
    let res = await fetchData(apiId);
    return res;
  },
);

export const apiSlice = createSlice({
  name: "api",
  initialState,
  reducers: {
    clearData: (state) => {
      state.data = {};
      state.status = "idle";
      state.error = "";
    },
    toggleQuote: (state, { payload }) => {
      state.openedQuote = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAPIData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAPIData.fulfilled, (state, action) => {
        state.status = "idle";
        state.data = action.payload;
        state.error = "";
      })
      .addCase(fetchAPIData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const apiState = (state: RootState) => state.api;
export const { clearData, toggleQuote } = apiSlice.actions;

export default apiSlice.reducer;
