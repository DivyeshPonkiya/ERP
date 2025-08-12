import {configureStore} from '@reduxjs/toolkit';
import {persistStore, persistReducer, createTransform} from 'redux-persist';
import resetMiddleware from '../toolkitMiddleware/resetMiddleware';
import rootReducer from '../createSlice';

import storage from '../storage';

const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['authSlice'], //Things you want to persist
  blacklist: [], //Things you don't want to persist
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false, // 🔥 Disables the middleware
      immutableCheck: false,
    }).concat(resetMiddleware),
  reducer: persistedReducer,
});

export const persist = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
