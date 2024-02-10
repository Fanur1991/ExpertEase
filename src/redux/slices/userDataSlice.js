import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';
import { authSlice } from './authSlice';

const initialState = {
  user: null,
  isLoading: false,
  error: null,
};

export const updateProfile = createAsyncThunk(
  'userData/updateProfile',
  async (userData, { dispatch, getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const token = auth.token;

      const response = await axios.post(
        '/auth/user/update',
        {
          userId: auth.user._id,
          ...userData,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Обновляем пользователя в userDataSlice
      const updatedUserData = response.data.user;
      dispatch(userDataSlice.actions.setUserData(updatedUserData));

      // Также обновляем пользователя в authSlice, если это необходимо
      if (auth.user._id === updatedUserData._id) {
        dispatch(authSlice.actions.setUser(updatedUserData));
      }

      return updatedUserData;
    } catch (error) {
      console.error('Ошибка при загрузке:', error);

      return rejectWithValue(error.response.data.message);

      // return rejectWithValue({
      //   status: error.response.status,
      //   message: error.response.data,
      // });
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
        throw new Error(`Ошибка: ${response.statusText}`);
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

export const changePassword = createAsyncThunk(
  'userData/changePassword',
  async ({ userId, newPassword }, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const token = auth.token;

      const response = await axios.post(
        '/auth/user/change-password',
        {
          userId,
          newPassword,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      return response.data;
    } catch (error) {
      console.error('Ошибка при изменении пароля:', error);

      const errorMessage =
        error.response?.data?.message || 'Ошибка при изменении пароля';
      return rejectWithValue(errorMessage);

      // return rejectWithValue({
      //   status: error.response.status,
      //   message: error.response.data,
      // });
    }
  }
);

export const deleteUserAccount = createAsyncThunk(
  'userData/deleteUserAccount',
  async (userId, { dispatch, getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const { token } = auth.token;

      const response = await axios.delete(`/auth/user/delete/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        dispatch(logoutUserData());
        dispatch(authSlice.actions.logout());
      }

      return userId;
    } catch (error) {
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
        rejectWithValue('Токен отсутствует');
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

export const addProjects = createAsyncThunk(
  'userData/addProjects',
  async (newProject, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const token = auth.token;
      const userId = auth.user._id;

      if (!token) {
        throw new Error('Токен отсутствует');
      }

      const response = await axios.post(
        '/auth/projects/add',
        {
          userId,
          projectData: newProject,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchProjects = createAsyncThunk(
  'userData/fetchProjects',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const token = auth.token;
      const userId = auth.user._id;

      if (!token) {
        throw new Error('Токен отсутствует');
      }

      const response = await axios.get(`/auth/projects?userId=${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || 'Ошибка при запросе данных пользователя'
      );
    }
  }
);

export const deleteProjects = createAsyncThunk(
  'userData/deleteProjects',
  async (projectId, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const token = auth.token;
      const userId = auth.user._id;

      if (!token) {
        throw new Error('Токен отсутствует');
      }

      const response = await axios.delete(
        `/auth/projects/delete/${projectId}?userId=${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addUserStack = createAsyncThunk(
  'stacks/addUserStack',
  async (stackData, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const token = auth.token;
      const userId = auth.user._id;

      if (!token) {
        return rejectWithValue('Токен отсутствует');
      }

      const response = await axios.post(
        '/auth/user/add-stack',
        {
          userId,
          stackData,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const userDataSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    logoutUserData: (state) => {
      state.user = null;
      state.isLoading = false;
      state.error = null;
    },
    setUserData: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    // --------------------------------------------------------------------------------------------
    // updateProfile
    // --------------------------------------------------------------------------------------------
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
    // --------------------------------------------------------------------------------------------
    // updateAvatarProfile
    // --------------------------------------------------------------------------------------------
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
    // --------------------------------------------------------------------------------------------
    // changePassword
    // --------------------------------------------------------------------------------------------
    builder.addCase(changePassword.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(changePassword.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    });
    builder.addCase(changePassword.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    // --------------------------------------------------------------------------------------------
    // deleteAvatarProfile
    // --------------------------------------------------------------------------------------------
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
    // --------------------------------------------------------------------------------------------
    // deleteUserAccount
    // --------------------------------------------------------------------------------------------
    builder.addCase(deleteUserAccount.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(deleteUserAccount.fulfilled, (state) => {
      state.user = null;
      window.localStorage.removeItem('token');
    });
    builder.addCase(deleteUserAccount.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    // --------------------------------------------------------------------------------------------
    // fetchProfile
    // --------------------------------------------------------------------------------------------
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
    // --------------------------------------------------------------------------------------------
    // addProjects
    // --------------------------------------------------------------------------------------------
    builder.addCase(addProjects.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(addProjects.fulfilled, (state, action) => {
      state.isLoading = false;
      // state.user.projects.push(action.payload);
      state.user = action.payload;
    });
    builder.addCase(addProjects.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    // --------------------------------------------------------------------------------------------
    // fetchProjects
    // --------------------------------------------------------------------------------------------
    builder.addCase(fetchProjects.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchProjects.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    });
    builder.addCase(fetchProjects.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    // --------------------------------------------------------------------------------------------
    // deleteProjects
    // --------------------------------------------------------------------------------------------
    builder.addCase(deleteProjects.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(deleteProjects.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    });
    builder.addCase(deleteProjects.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    // --------------------------------------------------------------------------------------------
    // Add user stack to rate
    // --------------------------------------------------------------------------------------------
    builder.addCase(addUserStack.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(addUserStack.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user.stacksRating.push(action.payload);
    });
    builder.addCase(addUserStack.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default userDataSlice.reducer;

export const { logoutUserData } = userDataSlice.actions;

export const selectUserData = (state) => state.userData;
