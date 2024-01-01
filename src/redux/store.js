import { configureStore, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import authSlice from './slices/authSlice';
import stacksSlice from './slices/stacksSlice';
import categoriesSlice from './slices/categoriesSlice';
import skillsSlice from './slices/skillsSlice';
import userDataSlice from './slices/userDataSlice';

const rootReducer = combineReducers({
  auth: authSlice,
  userData: userDataSlice,
  stacks: stacksSlice,
  categories: categoriesSlice,
  skills: skillsSlice,
});

const rootPersistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'stacks', 'categories', 'skills', 'userData'],
};

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export default store;
