import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// Define a type for a single surah
export interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation?: string;
  numberOfAyahs: number;
}
export interface SurahResponse {
  data: Surah[];
}
/**************************************************************************** */
export interface OneAyah {
  text: string;
  juz?: number;
  name?: string;
}
export interface OneSurah {
  data: {
    ayahs: OneAyah[]; // Adding this to represent ayahs within a surah
    englishName?: string;
    name: string;
    number: number;
    numberOfAyahs: number;
    revelationType: string;
  } | null;
}
/****************************************************************************** */
interface SurahOfJuz {
  data: {
    surahs: {
      [key: string]: Surah;
    };
  };
}
/****************************************************************************** */

export const apiSlice = createApi({
  reducerPath: "quran",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.alquran.cloud/v1" }),
  endpoints: (builder) => ({
    getAllSurah: builder.query<SurahResponse, void>({
      query: () => "surah",
    }),
    getOneSurah: builder.query<OneSurah, number | string | undefined>({
      query: (number) => `surah/${number}`,
    }),
    getAllSurahsOfJuz: builder.query<SurahOfJuz, number | string | undefined>({
      query: (numberJuz) => `juz/${numberJuz}`,
    }),
  }),
});

// https://api.alquran.cloud/v1/juz/30/quran-uthmani

export const {
  useGetAllSurahQuery,
  useGetOneSurahQuery,
  useGetAllSurahsOfJuzQuery,
} = apiSlice;
