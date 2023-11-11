import React, { useEffect } from 'react';
import tw, { TwStyle } from 'twin.macro';
import { SerializedStyles } from '@emotion/react';
import { Link, useNavigate } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '../utils/axios';
import { IBoard } from '../types/dto.types';
import { Nihil } from '../utils/nihil';

interface Props {
  styles?: TwStyle | SerializedStyles;
}

export function QueryGet({ styles, }: Props) {
  // 페이지 탐색에 필요한 준비물
  const navi = useNavigate();

  const qc = useQueryClient();

  // useQuery를 통해서 서버에서 데이터를 가져온다.
  // data에 가져온 데이터가 들어있다.
  // isLoading은 준비중일 때 true이다.
  // isFetching은 가져오는 중일 때 true이다.
  // isError는 가져오기에 실패했을 때 true이다.
  // error에는 에러객체가 들어있다.
  // 이 외에도 많은 것들이 들어있으므로 알아보면 좋을 것...
  const {
    data, isLoading, isFetching, /* isError, error */
  } = useQuery({
    // useQuery 옵션의 1번. 쿼리의 식별 키. 모든 쿼리들은 이 키가 고유해야한다. 배열로 설정하는 것이 보통이다.
    queryKey: [ 'getBoards', ],
    // useQuery 옵션의 2번. 쿼리를 실질적으로 실행하는 함수. 비동기 함수로 만들며 axios를 이용해 데이터를 가져온다.
    queryFn: async () => {
      // api는 임의로 만든 axios 인스턴스로 초기 설정을 적용한 녀석이다. 도메인은 생략하고 값을 넣으면 된다.
      // get에는 두개의 인자가 들어가는데 첫번째 인자는 주소이다.
      // 두번째 인자는 axios 옵션이다. 헤더 값 등등을 조정할 수 있다.
      // get 우측에 있는 것 (<IBoards[]>) 은 타입스크립트의 제네릭이다. 가져오는 데이터의 타입을 명시한다.
      const { data, } = await api.get<IBoard[]>('/boards');

      // 데이터를 가공하려면 여기서 가공하면 됨.
      // 여기에서 리턴한 data는 useQuery의 data가 된다.
      return data.sort((a, b) => b.id - a.id);
    },
    // 이 외에 많은 옵션들이 있다.
  });

  useEffect(() => {
    qc.invalidateQueries();
  }, []);

  // 이거는 그냥 스타일이니까 무시해도 됨.
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
  };

  // 가져오는 중일 때의 처리를 해줘야한다. 안해도 되지만 사용자 편의를 위한 부분이다.
  if (isFetching || isLoading) {
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
      </div>
    </>
  );
}
