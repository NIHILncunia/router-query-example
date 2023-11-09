import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

type Board = {
  id: number;
  userId: number;
  title: string;
  content: string;
};

// api를 만듬
export const exampleApi = createApi({
  reducerPath: 'exampleApi',
  refetchOnFocus: false,
  tagTypes: [ 'Boards', ],
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://my-json-server.typicode.com/NIHILncunia/json-server-test',
  }),
  endpoints: (builder) => ({
    // 쿼리들은 여기에 존재함.
    getBoards: builder.query<Board[], void>({
      query: () => '/boards',
      providesTags: [ 'Boards', ],
    }),
    postBoard: builder.mutation<Board, Board>({
      query: (board: Board) => ({
        url: '/boards',
        method: 'POST',
        body: board,
      }),
      invalidatesTags: [ 'Boards', ],
    }),
    editBoard: builder.mutation<Board, { index: number; board: Board}>({
      query: ({ index, board, }) => ({
        url: `/boards/${index}`,
        method: 'PATCH',
        body: board,
      }),
      invalidatesTags: [ 'Boards', ],
    }),
    deleteBoard: builder.mutation<void, {index: number}>({
      query: ({ index, }) => ({
        url: `/boards/${index}`,
        method: 'DELETE',
      }),
      invalidatesTags: [ 'Boards', ],
    }),
  }),
});

// 자동으로 함수를 만들어줌.
export const {
  useGetBoardsQuery,
  usePostBoardMutation,
  useEditBoardMutation,
  useDeleteBoardMutation,
} = exampleApi;
