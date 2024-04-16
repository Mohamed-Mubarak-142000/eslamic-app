import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface OneMoshaf {
  id: number;
  moshaf_type: number;
  name: string;
  server: string;
  surah_list: string;
  surah_total: number;
}
export interface OneReciter {
  id: number;
  name?: string;
  moshaf?: OneMoshaf[] | undefined;
}

export interface TrescitersResponse {
  reciters: OneReciter[];
}

/******************************************************** */
export interface OneSurah {
  id: number;
  makkia: boolean;
  name: string;
}
export interface TSuwar {
  suwar: OneSurah[];
}
/******************************************************** */

export interface OneLive {
  id: number;
  name: string;
  url: string;
}

export interface OneLiveResponse {
  livetv: OneLive[] | null;
}
/*************************************************** */
export interface TOneTafser {
  id: number;
  tafasir_id: number;
  name: string;
  url: string;
}
export interface Ttafser {
  tafasir: {
    name: string;
    soar: TOneTafser[] | undefined;
  };
}

export const apiAudioSlice = createApi({
  reducerPath: " quranAudio",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://www.mp3quran.net/api/v3",
  }),
  endpoints: (builder) => ({
    getAllReciters: builder.query<TrescitersResponse, void>({
      query: () => "reciters?language=ar",
    }),
    getOneReciter: builder.query<TrescitersResponse, number | undefined>({
      query: (number) => `reciters?language=ar&reciter=${number}`,
    }),
    getAllSurahs: builder.query<TSuwar, void>({
      query: () => `suwar?language=ar`,
    }),
    getAllLive: builder.query<OneLiveResponse, void>({
      query: () => `live-tv?language=ar`,
    }),
    getTafserQuran: builder.query<Ttafser, void>({
      query: () => "tafsir",
    }),
  }),
});

export const {
  useGetAllRecitersQuery,
  useGetOneReciterQuery,
  useGetAllSurahsQuery,
  useGetAllLiveQuery,
  useGetTafserQuranQuery,
} = apiAudioSlice;
