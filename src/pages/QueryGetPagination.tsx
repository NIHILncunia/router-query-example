import React, { useEffect, useMemo } from 'react';
import tw, { TwStyle } from 'twin.macro';
import { SerializedStyles } from '@emotion/react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { api } from '../utils/axios';
import { IBoard } from '../types/dto.types';
import { Nihil } from '../utils/nihil';
import { getPageArray } from '../utils/getPageArray';

interface Props {
  styles?: TwStyle | SerializedStyles;
}

export function QueryGetPagination({ styles, }: Props) {
  // 페이지 탐색에 필요한 준비물
  const navi = useNavigate();

  const [ searthParams, ] = useSearchParams();

  const qc = useQueryClient();
  const pageNumber = +searthParams.get('pageNumber') || 1;

  console.log('pageNumber >> ', pageNumber);
  // 페이지네이션은 두가지 해결방법이 있다.
  // 1. 전체 데이터를 가져와서 쪼개는 것.
  // 2. 데이터베이스상에서 쪼개진 데이터를 넘겨주는 것.

  // 하지만 어느쪽이든 페이지네이션 버튼은 직접 구현해줘야한다.
  // 가장 먼저 전체 포스트수가 필요하다.

  // 이 예제에서는 페이징 버튼은 5개가 한 세트이다. [0,1,2,3,4], [5,6,7,8,9] ....

  // 이걸로 전체 포스트 수를 구하기로 한다.
  const { data: allBoards, } = useQuery({
    queryKey: [ 'getBoards', ],
    queryFn: async () => {
      const { data, } = await api.get<IBoard[]>('/boards');

      return data;
    },
  });

  // 이 함수로 총 페이지 수와 각 페이지 버튼을 가져온다.
  // totalPage 에는 총 페이지 수
  // pages 에는 이차원배열이 들어있음
  const { totalPage: lastPage, pages, } = getPageArray(allBoards);
  console.log('pages >> ', pages);

  // useMemo를 이용해 계산된 데이터를 활용하도록 한다.
  const currentPages = useMemo(() => {
    // 여기서 5는 페이지 버튼을 5개씩 쪼갰기 때문에 5로 나누는 것.
    // 계산에 따라서 pages 배열의 하나의 원소를 리턴하게 됨.

    if (pageNumber % 5 === 0) {
      // 5개씩 나눴기 때문에 5의 나머지값을 구하는데 0이면 - 1을 해줘야 함.
      return pages[Math.floor(pageNumber / 5) - 1];
    } else {
      return pages[Math.floor(pageNumber / 5)];
    }
  }, [ pageNumber, allBoards, ]);

  console.log('currentPages >> ', currentPages);

  // 각 페이지별 가져오는 구간.
  const {
    data, isLoading, isFetching,
  } = useQuery({
    queryKey: [ 'getBoardsByPage', pageNumber, ],
    queryFn: async () => {
      const { data, } = await api.get<IBoard[]>(`/boards/page/?pageNumber=${pageNumber}`);

      return data.sort((a, b) => b.id - a.id);
    },
  });

  console.log('pageData >> ', data);

  useEffect(() => {
    qc.invalidateQueries();
  }, []);

  const style = {
    default: [
      tw` w-[600px] mx-auto `,
      styles,
    ],
    link: [
      tw` text-blue-500 underline `,
    ],
    table: [
      tw` w-full border-collapse border border-black-base `,
      tw` [th,td]:( p-2 text-center border border-black-base ) `,
      tw` [td]:( nth-2:text-justify ) `,
    ],
    pageButton: [
      tw` p-1 block w-[60px] bg-blue-200 text-center `,
    ],
  };

  if (isLoading || isFetching) {
    return (
      <>
        <div>로딩중...</div>
      </>
    );
  }

  return (
    <>
      <div css={style.default}>
        <div className='block py-3'>
          <Link to='/' css={style.link}>홈으로</Link>
        </div>

        <div className='text-right py-3'>
          <button
            onClick={() => navi('/react-query/post')}
            className='inline-block p-2 bg-blue-400 text-white hover:bg-blue-500'
          >글쓰기
          </button>
        </div>

        <table css={style.table}>
          <colgroup>
            <col width='10%' />
            <col width='60%' />
            <col width='30%' />
          </colgroup>
          <thead>
            <tr>
              <th>NO.</th>
              <th>글 제목</th>
              <th>작성일자</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              // Nihil.uuid 은 내가 만든 클래스 메소드.
              <tr key={Nihil.uuid(item.id)}>
                <td>{item.id}</td>
                <td>
                  {/* 링크를 클릭하면 BoardContentPage 의 내용으로 넘어가게 됨. */}
                  <Link to={`/posts/${item.id}`} css={style.link}>
                    {item.title}
                  </Link>
                </td>
                {/* Nihil.dateString 이것도 그냥 내가 만든 것. */}
                <td>{Nihil.dateString(item.created)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* 이전, 다음 버튼은 알아서 구현해보길.. */}
        <div className='flex flex-row gap-2 mt-2 justify-center'>
          <Link
            to='/react-query/get-pagination?pageNumber=1'
            css={style.pageButton}
          >
            처음
          </Link>

          {currentPages?.map((number) => (
            <Link
              key={Nihil.uuid(number)}
              to={`/react-query/get-pagination?pageNumber=${number + 1}`}
              css={style.pageButton}
            >
              {number + 1}
            </Link>
          ))}

          <Link
            to={`/react-query/get-pagination?pageNumber=${lastPage}`}
            css={style.pageButton}
          >
            마지막
          </Link>
        </div>
      </div>
    </>
  );
}
