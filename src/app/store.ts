import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./apis/quran/apiSlice";
import { apiAudioSlice } from "./apis/audio/apiSlice";
import { apiHadithSlice } from "./apis/ahadith/apiSliceHadith";
import { apiSlicePrayerTiming } from "./apis/prayerTiming/prayerTiming";
import wishlistReducer from "@app/apis/audio/wishList";
import { setupListeners } from "@reduxjs/toolkit/query";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    [apiAudioSlice.reducerPath]: apiAudioSlice.reducer,
    wishlist: wishlistReducer,
    [apiHadithSlice.reducerPath]: apiHadithSlice.reducer, // Corrected
    [apiSlicePrayerTiming.reducerPath]: apiSlicePrayerTiming.reducer, // Corrected
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      apiSlice.middleware,
      apiAudioSlice.middleware,
      apiHadithSlice.middleware,
      apiSlicePrayerTiming.middleware
    ), // Corrected
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
