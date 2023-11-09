import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type InitialState = {
  word: string;
};

const initialState: InitialState = {
  word: 'JavaScript',
};

const exampleReducer = createSlice({
  name: 'example',
  initialState,
  reducers: {
    setWord(
      state,
      { payload, }: PayloadAction<string>
    ) {
      state.word = payload;
    },
  },
});

export const {
  setWord,
} = exampleReducer.actions;
export default exampleReducer.reducer;
