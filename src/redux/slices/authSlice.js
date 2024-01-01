import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';

const initialState = {
  user: null,
  token: null,
  isLoading: false,
  status: null,
};

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/auth/register', {
        email,
        password,
      });
      if (data.token) {
        window.localStorage.setItem('token', data.token);
      }
      return data;
    } catch (error) {
      console.log(error.response.data.errors[0].msg);
      return rejectWithValue(error.response.data.errors[0].msg);
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/auth/login', {
        email,
        password,
      });
      if (data.token) {
        window.localStorage.setItem('token', data.token);
      }
      return data;
    } catch (error) {
      console.log(error.response.data.errors[0].msg);
      return rejectWithValue(error.response.data.errors[0].msg);
    }
  }
);

// export const getMe = createAsyncThunk('auth/getMe', async () => {
//   try {
//     const { data } = await axios.get('/auth/me');
//     return data;
//   } catch (error) {
//     console.log(error);
//   }
// });

export const getMe = createAsyncThunk('auth/getMe', async (_, thunkAPI) => {
  try {
    const token = window.localStorage.getItem('token');
    if (!token) {
      throw new Error('Токен отсутствует');
    }
    const response = await axios.get('/auth/me', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return thunkAPI.rejectWithValue({
      message: 'Failed to fetch user data',
      error: error?.response?.data || 'Неизвестная ошибка',
    });
  }
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isLoading = false;
      state.status = null;
    },
  },
  extraReducers: (builder) => {
    // Register user
    builder.addCase(registerUser.pending, (state) => {
      state.isLoading = true;
      state.status = null;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.status = action.payload.message;
      state.user = action.payload.user;
      state.token = action.payload.token;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.isLoading = false;
      state.status =
        action.payload || 'Ошибка при регистрации. Неккоректные данные';
    });
    // Login user
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
      state.status = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.status = action.payload.message;
      state.user = action.payload.user;
      state.token = action.payload.token;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.status =
        action.payload || 'Ошибка при авторизации. Неккоректные данные';
    });
    // Проверка авторизации
    builder.addCase(getMe.pending, (state) => {
      state.isLoading = true;
      state.status = null;
    });
    builder.addCase(getMe.fulfilled, (state, action) => {
      state.isLoading = false;
      state.status = null;
      state.user = action.payload?.user;
      state.token = window.localStorage.getItem('token');
    });
    builder.addCase(getMe.rejected, (state, action) => {
      state.status = action.payload.message;
      state.isLoading = false;
      state.user = null;
      state.token = null;
      window.localStorage.removeItem('token');
    });
  },
});

export const checkIsAuth = (state) => Boolean(state.auth.token);

export const selectAuth = (state) => state.auth;

export const { logout } = authSlice.actions;

export default authSlice.reducer;
