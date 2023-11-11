import React, {
  ChangeEvent, useCallback, useEffect, useState
} from 'react';
import tw, { TwStyle } from 'twin.macro';
import { SerializedStyles } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../utils/axios';
import { IBoard, ICreatePost } from '../types/dto.types';

interface Props {
  styles?: TwStyle | SerializedStyles;
}

export function CreatePost({ styles, }: Props) {
  const [ title, setTitle, ] = useState('');
  const [ content, setContent, ] = useState('');

  const qc = useQueryClient();

  // GET이 아닌 method로 통신을 할 때에는 useMutation을 사용함.
  const createPost = useMutation({
    // 뮤테이션 함수에는 매개변수가 필요하다. 물론 경우에 따라서는 없을 수도 있다.
    mutationFn: async (postData: ICreatePost) => {
      const { data, } = await api.post<IBoard>('/boards', postData);
      return data;
    },
  });

  // 페이지 탐색에 필요한 준비물
  const navi = useNavigate();

  // 제목을 컨트롤하기 위한 함수
  const onChangeTitle = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setTitle(event.target.value);
    },
    []
  );

  // 내용을 컨트롤하기 위한 함수
  const onChangeContent = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      setContent(event.target.value);
    },
    []
  );

  // 글작성을 위한 함수
  const onClickPost = useCallback(
    () => {
      if (!title || !content) {
        return;
      }

      // 뮤테이션 요청을 보낼 때에는 mutate 함수를 사용.
      // useMutation을 작성할 때 넣어줬던 매개변수가 여기에 사용됨.
      createPost.mutate({
        title,
        content,
      });
    },
    [ createPost, title, content, ]
  );

  useEffect(() => {
    if (createPost.isSuccess) {
      qc.invalidateQueries();

      navi(-1);
    }
  }, [ createPost.isSuccess, qc, ]);

  const style = {
    default: [
      tw` w-[600px] mx-auto `,
      styles,
    ],
    link: [
      tw` text-blue-500 underline `,
    ],
    inputBlock: [
      tw` mb-2 flex flex-col gap-2 `,
    ],
    label: [
      tw` font-700 text-[1.2rem] `,
    ],
    input: [
      tw` w-full p-2 bg-blue-100 outline-none `,
    ],
    textarea: [
      tw` w-full h-[350px] bg-blue-100 resize-none outline-none p-2 `,
    ],
    toBack: [
      tw` text-right py-3 `,
      tw` [button]:(
        bg-blue-400 hover:bg-blue-500 text-white p-2
      ) `,
    ],
    button: [
      tw` text-white p-2 shrink-0 flex-1 `,
    ],
  };

  return (
    <>
      <div css={style.default}>
        <div css={style.toBack}>
          <button onClick={() => navi(-1)}>목록으로</button>
        </div>

        <div>
          <label htmlFor='title' css={style.inputBlock}>
            <span css={style.label}>글제목</span>
            <input
              type='text'
              id='title'
              value={title}
              onChange={onChangeTitle}
              css={style.input}
            />
          </label>
          <label htmlFor='content' css={style.inputBlock}>
            <span css={style.label}>글내용</span>
            <textarea
              id='content'
              defaultValue={content}
              onChange={onChangeContent}
              css={style.textarea}
            />
          </label>
        </div>

        <div className='flex flex-row gap-2 mt-3'>
          <button
            css={[
              style.button,
              tw` bg-blue-400 hover:bg-blue-500 `,
            ]}
            onClick={onClickPost}
          >
            작성
          </button>
          <button
            css={[
              style.button,
              tw` bg-red-400 hover:bg-red-500 `,
            ]}
            onClick={() => navi(-1)}
          >
            취소
          </button>
        </div>
      </div>
    </>
  );
}
