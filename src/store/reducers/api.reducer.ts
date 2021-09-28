import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DataItemI, fetchData } from "../../api/app.api";
import { RootState } from "../store";

export interface DataState {
  data: { [key: string]: DataItemI };
  status: "idle" | "loading" | "failed";
  error: string;
}

const initialState: DataState = {
  data: {},
  status: "idle",
  error: "",
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
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAPIData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAPIData.fulfilled, (state, action) => {
        state.status = "idle";
        state.data = action.payload;
      });
  },
});

export const apiState = (state: RootState) => state.api;

export default apiSlice.reducer;
