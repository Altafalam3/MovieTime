import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { offline } from 'redux-offline';
import offlineConfig from 'redux-offline/lib/defaults';
import layoutReducer from "./layoutSlice";
import genreReducer from "./genreSlice";
import userReducer from "./userSlice";
import { tmdbApi } from './tmdbApi';
import { userApi } from './userApi';

// Redux persist configuration
const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};

// Create persisted reducers
const layoutPersistConfig = {
  key: 'layout',
  storage: storage,
};
const genrePersistConfig = {
  key: 'genre',
  storage: storage,
};
const userPersistConfig = {
  key: 'user',
  storage: storage,
};
const tmdbApiPersistConfig = {
  key: 'tmdbApi',
  storage: storage,
};
const userApiPersistConfig = {
  key: 'userApi',
  storage: storage,
};

// Create persisted reducers
const persistedLayoutReducer = persistReducer(layoutPersistConfig, layoutReducer);
const persistedGenreReducer = persistReducer(genrePersistConfig, genreReducer);
const persistedUserReducer = persistReducer(userPersistConfig, userReducer);
const persistedTmdbApiReducer = persistReducer(tmdbApiPersistConfig, tmdbApi.reducer);
const persistedUserApiReducer = persistReducer(userApiPersistConfig, userApi.reducer);

const reducer = combineReducers({
  layout: persistedLayoutReducer,
  genre: persistedGenreReducer,
  user: persistedUserReducer,
  [tmdbApi.reducerPath]: persistedTmdbApiReducer,
  [userApi.reducerPath]: persistedUserApiReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

// Create store with persisted reducer and offline middleware
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      tmdbApi.middleware,
      userApi.middleware,
      // offline(offlineConfig)
    ),
});

// Create persistor
export const persistor = persistStore(store);
