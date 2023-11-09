import React from 'react';
import tw, { TwStyle, css } from 'twin.macro';
import { SerializedStyles } from '@emotion/react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { api } from '../utils/axios';

interface Props {
  styles?: TwStyle | SerializedStyles;
}

export function QueryGet({ styles, }: Props) {
  const {
    data, isLoading, isFetching, isError, error,
  } = useQuery({
    // 쿼리의 식별 키. 모든 쿼리들은 이 키가 고유해야한다. 배열로 설정하는 것이 보통이다.
    queryKey: [ 'getBoards', ],
    // 쿼리를 실질적으로 실행하는 함수. 비동기 함수로 만들며 axios를 이용해 데이터를 가져온다.
    queryFn: async () => {
      const { data, } = await api.get('');

      // 여기에서 리턴한 data는 useQuery의 data가 된다.
      return data;
    },
  });

  const style = {
    default: [],
    link: [
      tw` p-2 text-blue-500 underline text-center `,
    ],
  };

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
        <div>
          <Link to='/' css={style.link}>홈으로</Link>
        </div>

        get
      </div>
    </>
  );
}
