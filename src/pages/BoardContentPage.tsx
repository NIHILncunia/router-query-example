import React, {
  ChangeEvent, useCallback, useState
} from 'react';
import tw, { TwStyle } from 'twin.macro';
import { SerializedStyles } from '@emotion/react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '../utils/axios';
import { IBoard, IUpdatePost } from '../types/dto.types';

interface Props {
  styles?: TwStyle | SerializedStyles;
}

export function BoardContentPage({ styles, }: Props) {
  const [ isEdit, setIsEdit, ] = useState(false);
  const [ title, setTitle, ] = useState('');
  const [ content, setContent, ] = useState('');

  const navi = useNavigate();
  const param = useParams<{ id: string }>();

  const qc = useQueryClient();

  // 이 컴포넌트는 posts/:id 경로로 접근하면 실행된다.
  // 경로에 : 이 붙은 녀석들은 경로 매개변수이다.
  // :id의 경우 useParams를 이용하면 쉽게 구할 수 있다. {id: string} 타입으로 반환된다.
  console.log(param);

  // 가져온 포스트 아이디로 개별 포스트 쿼리를 돌린다.
  const {
    data, isLoading, isFetching,
  } = useQuery({
    // 개별 데이터를 가져올 때에는 보통 이런식으로 변하는 데이터도 같이 넣어준다.
    queryKey: [ 'getBoardById', +param.id, ],
    queryFn: async () => {
      const { data, } = await api.get<IBoard>(`/boards/${+param.id}`);

      return data;
    },
  });

  // update는 PATCH이기 때문에 역시 useMutation을 사용한다.
  const updatePost = useMutation({
    mutationFn: async (updateData: IUpdatePost) => {
      const { data, } = await api.patch<IBoard>(`/boards/${+param.id}`, updateData);

      return data;
    },
  });

  // delete도 useMutation을 사용한다.
  const deletePost = useMutation({
    mutationFn: async () => {
      const { data, } = await api.delete<void>(`/boards/${+param.id}`);

      return data;
    },
  });

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

  // 수정하기 버튼을 클릭했을 때의 두가지 경우를 설정함.
  const onClickUpdate = useCallback(
    () => {
      if (isEdit) {
        setIsEdit(false);
        updatePost.mutate({
          title,
          content,
        }, {
          // 뮤테이션 요청이 성공했을 경우, 실행되는 부분.
          onSuccess() {
            // 모든 요청을 다시 보내서 가져옴.
            qc.invalidateQueries();
            // 뒤로
            navi(-1);
          },
        });
      } else {
        setIsEdit(true);
        setTitle(data.title);
        setContent(data.content);
      }
    },
    [ updatePost, isEdit, data, title, content, ]
  );

  // 삭제버튼
  const onClickDelete = useCallback(
    () => {
      // 옵션을 설정해야하는데 데이터를 받지 않는 mutation의 경우에는 이렇게 null을 전달하고 옵션 설정하면 됨.
      deletePost.mutate(null, {
        onSuccess() {
          qc.invalidateQueries();
          navi(-1);
        },
      });
    },
    [ deletePost, ]
  );

  const style = {
    default: [
      tw` w-[600px] mx-auto `,
      styles,
    ],
    link: [
      tw` text-blue-500 underline `,
    ],
    toBack: [
      tw` py-3 flex flex-row gap-1 items-center justify-end `,
      tw` [button]:(
        bg-blue-400 hover:bg-blue-500 text-white p-2
        nth-last-1:(
        bg-red-400 hover:bg-red-500
        )
      ) `,
    ],
    input: [
      tw` w-full p-2 bg-blue-100 outline-none `,
    ],
    textarea: [
      tw` w-full h-[350px] bg-blue-100 resize-none outline-none p-2 `,
    ],
    inputBlock: [
      tw` mb-2 flex flex-col gap-2 `,
    ],
    label: [
      tw` font-700 text-[1.2rem] `,
    ],
  };

  if (isLoading || isFetching) {
    return (
      <>
        <div>로딩중..</div>
      </>
    );
  }

  return (
    <>
      <div css={style.default}>
        <div css={style.toBack}>
          <button onClick={() => navi(-1)}>목록으로</button>
          <button onClick={onClickUpdate}>수정하기</button>
          <button onClick={onClickDelete}>삭제하기</button>
        </div>

        {isEdit ? (
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
        ) : (
          <>
            <h2>{data.title}</h2>
            <p>{data.created}</p>
            <p>{data.updated}</p>
          </>
        )}

        {isEdit ? (
          <label htmlFor='content' css={style.inputBlock}>
            <span css={style.label}>글내용</span>
            <textarea
              id='content'
              defaultValue={content}
              onChange={onChangeContent}
              css={style.textarea}
            />
          </label>
        ) : (
          <div>
            {data.content}
          </div>
        )}
      </div>
    </>
  );
}
