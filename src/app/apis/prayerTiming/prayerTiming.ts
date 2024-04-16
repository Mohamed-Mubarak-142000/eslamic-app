import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface OneTiming {
  [x: string]: { [s: string]: unknown } | ArrayLike<unknown>;
  timing: {
    [key: string]: string;
  };
}

interface OnePrayer {
  data: OneTiming[] | null;
}

export const apiSlicePrayerTiming = createApi({
  reducerPath: "prayerTiming",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.aladhan.com/v1/",
  }),
  endpoints: (builder) => ({
    getCityAndCountry: builder.query<
      OnePrayer,
      { city: string; country: string }
    >({
      query: ({ city, country }) =>
        `calendarByCity?city=${city}&country=${country}&method=2`,
    }),
  }),
});

export const { useGetCityAndCountryQuery } = apiSlicePrayerTiming;
