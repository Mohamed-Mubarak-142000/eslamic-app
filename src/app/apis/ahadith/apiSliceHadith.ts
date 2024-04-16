import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface OnePerson {
  id: string;
  name: string;
}

interface TbooksAhadith {
  data: OnePerson[] | undefined;
}
/*********************************************** */
export interface OneHadith {
  number: string;
  arab: string;
}

interface Thadiths {
  data: {
    name: string;
    idName: string;
    requested: number;
    hadiths: OneHadith[] | undefined;
  };
}

/****************** */
export const apiHadithSlice = createApi({
  reducerPath: "hadith",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.hadith.gading.dev",
  }),
  endpoints: (builder) => ({
    getAllBooks: builder.query<TbooksAhadith, void>({
      query: () => "books",
    }),
    getAllBooksOfRange: builder.query<
      Thadiths,
      { book: string; start: number; end: number }
    >({
      query: ({ book, start, end }) => `books/${book}?range=${start}-${end}`,
    }),
  }),
});

export const { useGetAllBooksQuery, useGetAllBooksOfRangeQuery } =
  apiHadithSlice;
