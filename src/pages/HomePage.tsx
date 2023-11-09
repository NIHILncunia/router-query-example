import React from 'react';
import { Link } from 'react-router-dom';
import tw, { css } from 'twin.macro';
import { AppLayout } from '@/src/layouts';

export function HomePage() {
  const style = {
    default: css([
      tw` w-[500px] mx-auto flex flex-col gap-2 `,
      tw` [a]:( block p-2 text-blue-500 underline text-center ) `,
    ]),
  };

  return (
    <>
      <AppLayout title='홈'>
        <div css={style.default}>
          {/* 링크 컴포넌트는 리액트 라우터의 모든 링크에 사용됨. href 대신에 to가 있고
           to에 주소를 넣으면 됨. */}
          <Link to='/react-query/get'>GET 예시</Link>
          <Link to='/react-query/post'>POST 예시</Link>
          <Link to='/react-query/patch'>PATCH 예시</Link>
          <Link to='/react-query/delete'>DELETE 예시</Link>
        </div>
      </AppLayout>
    </>
  );
}
