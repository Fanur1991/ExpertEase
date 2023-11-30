import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { setError } from './errorSlice';

const initialState = {
  data: [],
  isLoading: false,
};

export const fetchCategory = createAsyncThunk(
  'category/fetchCategory',
  async (url, thunkAPI) => {
    try {
      const res = await axios.get(url);
      return res.data;
    } catch (error) {
      thunkAPI.dispatch(setError(error.message));
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const categorySlice = createSlice({
  initialState,
  name: 'categories',
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCategory.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCategory.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload.data.map((category) => {
        return {
          name: category.name,
          desc: category.desc,
          skills: category.skills,
          _id: category._id,
        };
      });
    });
    builder.addCase(fetchCategory.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export default categorySlice.reducer;

export const selectCategories = (state) => state.categories;
