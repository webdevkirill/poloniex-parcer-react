import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DataItemI, fetchData } from "../../api/app.api";
import { RootState } from "../store";

export interface DataState {
  data: { [key: string]: DataItemI };
  status: "idle" | "loading" | "failed";
  error: any;
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
  reducers: {
    clearData: (state) => {
      state.data = {};
      state.status = "idle";
      state.error = "";
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
export const { clearData } = apiSlice.actions;

export default apiSlice.reducer;
