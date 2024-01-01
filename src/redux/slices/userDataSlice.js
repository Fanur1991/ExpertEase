import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';

const initialState = {
  user: null,
  isLoading: false,
  error: null,
};

export const updateProfile = createAsyncThunk(
  'userData/updateProfile',
  async (userData, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const response = await axios.post('/auth/user/update', {
        userId: auth.user._id,
        ...userData,
      });
      return response.data.user;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateAvatarProfile = createAsyncThunk(
  'userData/updateAvatarProfile',
  async (userData, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const token = auth.token;

      const response = await axios.post('/auth/upload', userData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status !== 200 && response.status !== 201) {
        throw new Error(`Error: ${response.statusText}`);
      }

      return response.data.user.avatarUrl;
    } catch (error) {
      console.error('Ошибка при загрузке:', error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteAvatarProfile = createAsyncThunk(
  'userData/deleteAvatarProfile',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const token = auth.token;

      const response = await axios.post(
        '/auth/delete-avatar',
        { userId: auth.user._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status !== 200 && response.status !== 201) {
        throw new Error(`Error: ${response.statusText}`);
      }

      return null;
    } catch (error) {
      console.error('Ошибка при удалении аватара:', error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchProfile = createAsyncThunk(
  'userData/fetchProfile',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const token = auth.token;

      if (!token) {
        throw new Error('Токен отсутствует');
      }

      const response = await axios.get('/auth/user/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.user;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || 'Ошибка при запросе данных пользователя'
      );
    }
  }
);

const userDataSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    logoutUserData: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateProfile.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(updateProfile.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    });
    builder.addCase(updateProfile.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(updateAvatarProfile.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(updateAvatarProfile.fulfilled, (state, action) => {
      state.isLoading = false;
      if (state.user) {
        state.user.avatarUrl = action.payload;
      }
    });
    builder.addCase(updateAvatarProfile.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(deleteAvatarProfile.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(deleteAvatarProfile.fulfilled, (state, action) => {
      state.isLoading = false;
      if (state.user) {
        state.user.avatarUrl = action.payload;
      }
    });
    builder.addCase(deleteAvatarProfile.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(fetchProfile.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchProfile.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    });
    builder.addCase(fetchProfile.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default userDataSlice.reducer;

export const { logoutUserData } = userDataSlice.actions;

export const selectUserData = (state) => state.userData;
