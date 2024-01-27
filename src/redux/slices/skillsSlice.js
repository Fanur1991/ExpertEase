import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../utils/axios';
import { setError } from './errorSlice';

const initialState = {
  data: [],
  isLoading: false,
};

export const fetchSkill = createAsyncThunk(
  'skill/fetchSkill',
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

const skillSlice = createSlice({
  initialState,
  name: 'skills',
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSkill.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchSkill.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload.data.map((skill) => {
        return {
          title: skill.title,
          desc: skill.desc,
          _id: skill._id,
          details: skill.details,
          skillId: skill.skillId,
        };
      });
    });
    builder.addCase(fetchSkill.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export default skillSlice.reducer;

export const selectSkills = (state) => state.skills;
