import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import stacksSlice from './slices/stacksSlice';
import categoriesSlice from './slices/categoriesSlice';
import skillsSlice from './slices/skillsSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    stacks: stacksSlice,
    categories: categoriesSlice,
    skills: skillsSlice,
  },
});

export default store;
