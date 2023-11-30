import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { setError } from './errorSlice';

const initialState = {
  data: [],
  isLoading: false,
};

export const fetchStack = createAsyncThunk(
  'stacks/fetchStack',
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

const stackSlice = createSlice({
  initialState,
  name: 'stacks',
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchStack.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchStack.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload.data.map((stack) => ({
        name: stack.name,
        desc: stack.desc,
        categories: stack.categories,
        _id: stack._id,
      }));
    });
    builder.addCase(fetchStack.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export default stackSlice.reducer;

export const selectStacks = (state) => state.stacks;

