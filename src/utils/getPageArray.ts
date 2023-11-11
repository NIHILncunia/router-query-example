import { IBoard } from '../types/dto.types';

export const getPageArray = (posts: IBoard[]) => {
  if (posts) {
    const totalPage = Math.ceil(posts.length / 5);

    let pageArray = new Array(totalPage)
      .fill(0)
      .map((item: number, index) => item + index);

    let pageArray2 = new Array(Math.ceil(pageArray.length / 5))
      .fill(0)
      .map(() => pageArray.splice(0, 5));

    return {
      totalPage,
      pages: pageArray2,
    };
  } else {
    return {
      totalPage: 0,
      pages: [],
    };
  }
};
