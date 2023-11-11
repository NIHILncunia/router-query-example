export type IBoard = {
  id: number;
  title: string;
  content: string;
  created: string;
  updated: string;
};

export type ICreatePost = {
  title: string;
  content: string;
};

export type IUpdatePost = Partial<ICreatePost>;
