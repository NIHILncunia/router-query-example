# 리액트 라우터 + 리액트 쿼리 기본 개념 살펴보기
예시는 게시판.

필요한 리포지토리는 두개로 하나는 이것. 프론트에 해당하는 리포지토리로 일단은 여기에 있는 내용들만 보면 됨. 두 번째는 [백엔드](https://github.com/NIHILncunia/board-backend). 백엔드는 기본적인 API 구성만 해놓은 상태로 여기는 안봐도 되지만 패키지 설치한 후에 .env 파일을 만들어서 .env.example의 내용을 복붙해둬야 함.

무슨 말인지 모르겠으면 그냥 .env.example 파일 복사해서 이름을 .env 로 바꿔두고 yarn run n:dev 실행하면 됨.

백엔드는 4000번 포트로 돌아가고 NestJS로 작업.
프론트는 3000번 포트로 돌아가고 Vite로 작업.

# 리액트 라우터의 기본
리액트 라우터는 리액트에 페이지를 만들어주는 느낌을 준다. 일반 리액트로는 웹 사이트를 구성하기 어렵지만 리액트 라우터가 있으면 웹 사이트를 구성할 수 있게 된다. 리액트 라우터는 페이지가 실제로 존재하는 것처럼 브라우저를 속여서 페이지를 구현해준다.

## 라우터 설정하기
보통은 최상위 컴포넌트를 `BrowserRouter` 로 감싸준다. `Routes` 컴포넌트 안에서 `Route` 들을 설정해준다. 자세한 것은 `main.tsx` 참조

```ts
import { BrowserRouter, Route, Routes } from 'react-router-dom';
```

```tsx
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}
```

## Link 컴포넌트
리액트 라우터에 사용되는 전용 링크 컴포넌트인 `Link` 컴포넌트가 있고 이 컴포넌트를 통해서 페이지간의 이동을 처리한다. 자매품은 `NavLink` 컴포넌트가 있다. `Link` 컴포넌트와 같은 기능을 하지만 조금 더 차별화 된 컴포넌트로 링크에 스타일을 적용할 수 있다. 그래서 이름처럼 메뉴(Nav)에 자주 사용된다.

```ts
import { Link } from 'react-router-dom';
```

```tsx
function App() {
  return (
    <>
      <Link to=''>링크</Link>
    </>
  );
}
```

## useParams
주소상에 경로 변수가 있을 경우 이를 감지해낸다. 라우트상에서 주소를 `/posts/:id` 이런식으로 : 를 넣어 설정했을 경우에 해당한다. :를 사용한 단어를 경로 매개변수라고 부른다.

```ts
import { useParams } from 'react-router-dom';
const param = useParams<{ id: string }>();
```

`useParams` 의 제네릭에는 자신이 사용할 매개변수의 타입을 명시해주면 자동완성이 제공된다.

## useLocation
`useLocation` 은 현재 페이지의 주소 정보를 가져온다.

```ts
import { useLocation } from 'react-router-dom';
const location = useLocation();
```

## useSearchParams
`useSearchParams` 는 URL에서 쿼리스트링의 특정 값을 가져올 수 있다. 배열을 반환하는데 첫번째 원소가 가져오는 역할을 하고 두번째 원소가 쿼리스트링을 변경하는 함수이다. 아래처럼 사용한다.

```tsx
// URL = localhost:4000/posts?pageNumber=1

import { useSearchParams } from 'react-router-dom';
const [ searthParams, setSearchParams ] = useSearchParams();

const pageNumber = searchParams.get('pageNumber');// '1'

const setPageNumber = (pageNumber) => {
  setSearchParams({ pageNumber });
};

function App() {
  return (
    <>
      <button onClick={() => setPageNumber(5)}>
        {/* pageNumber=5 */}
        페이지 5
      </button>
    </>
  );
}
```

## useNavigate
`useNavigate` 는 페이지의 이동을 담당하는 녀석으로 `Link` 컴포넌트와 비슷한 기능을 가진다. `Link` 컴포넌트를 사용하지 않고 페이지를 이동해야 할 때 사용한다.

```ts
import { useNavigate } from 'react-router-dom';

const navi = useNavigate();

const onClickMove = () => {
  navi(''); // 상대 주소 문자열을 넣으면 그곳으로 이동.
  navi(1); // 양수를 넣으면 그것만큼 앞으로 이동.
  navi(-1); // 음수를 넣으면 그것만큼 뒤로 이동.
};
```

라우터는 당장에는 이정도만 알아도 상당한 도움이 된다.

# 리액트 쿼리의 기본
리액트 쿼리는 백엔드 서버와의 통신을 통해 그 응답을 캐싱해서 재사용할 수 있도록 해주는 기능을 가진다. 데이터에는 신선도라는 것이 있고, 이 신선도가 유지(캐싱)되고 있다면 다시 요청을 하지 않는 것이 리액트 쿼리의 요지이다. 신선도가 떨어졌다면 캐싱된 데이터가 오래됐다는 것을 의미하고 다시 쿼리를 요청한다.

쿼리를 사용하기 위해서는 백엔드 설정이 되어있어야한다. 이 예제를 위해서 백엔드는 구축해두었으니 사용하면 된다.

## 리액트 쿼리 설정하기
리액트 쿼리를 사용하기 위해서는 리액트 쿼리에서 제공하는 프로바이더 컴포넌트로 최상위 컴포넌트를 감싸야한다.

```ts
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
```

이렇게 가져오면 되고 리액트 쿼리는 개발도구도 함께 제공하며 별도의 라이브러리이기 때문에 별도로 설치해야한다.

```tsx
function App() {
  const queryClient = new QueryClient({
    // 여기에 리액트 쿼리의 설정을 한다. 자세한 사항은 공식문서 참조...
    // 혹은 src/layouts/Providers 컴포넌트 참조
    defaultOptions: {
      queries: {
        // useQuery 설정
      },
      mutations: {
        // useMutation 설정
      },
    },
  });

  return (
    <>
      {/* queryClient를 client의 값으로 전달 */}
      <QueryClientProvider client={queryClient}>
        {/* 개발도구도 같이 넣어줘야 편리하게 볼 수 있음. */}
        <ReactQueryDevtools position='bottom' />
        {/* ... */}
      </QueryClientProvider>
    </>
  );
}
```

## useQuery
서버에서 데이터를 가져올 때(GET) 사용하는 hook 이다. 가져올 때에만 사용한다. 버전에 따라서 정의 방법이 다른데 일단은 최신 버전을 기준으로 한다. 구버전은 최신버전 후에 간략하게 설명하도록 한다.

```ts
// data에 가져온 데이터가 들어있다.
// isLoading은 준비중일 때 true이다.
// isFetching은 가져오는 중일 때 true이다.
// isError는 가져오기에 실패했을 때 true이다.
// error에는 에러객체가 들어있다.
// 보이는 것들 말고도 많은 프로퍼티가 있고 자주 사용되는 것중 하나는 이 다섯개와 더불어
// isSuccess가 있다. 성공했을 때에 true가 된다.
const {data, isLoading, isFeching, isError, error} = useQuery({
  // useQuery 옵션의 1번. 쿼리의 식별 키. 모든 쿼리들은 이 키가 고유해야한다. 배열로 설정하는 것이 보통이다.
  queryKey: [],
  // useQuery 옵션의 2번. 쿼리를 실질적으로 실행하는 함수.
  // 비동기 함수로 만들며 axios를 이용해 데이터를 가져온다. fetch도 상관 없다.
  queryFn: async () => {
    // 가져오는 로직 구현. 반드시 리턴은 해줘야한다.
    // 여기서 리턴된 데이터가 위 useQuery의 data로 넘어간다.
  }
});
```

구버전 설정방법은 아래와 같다.

```ts
const {data, isLoading, isFeching, isError, error} = useQuery(
  [], // queryKey에 해당
  async () => {}, // queryFn에 해당
  {}, // options에 해당
);
```

구버전은 이렇게 쿼리키와 쿼리펑션을 분리해서 설정했었다.

## useMutation
POST, PATCH, PUT, DELETE 요청을 보낼 때에는 `useMutation` 을 사용한다. 설정방법은 아래와 같다.

```ts
// GET이 아닌 method로 통신을 할 때에는 `useMutation` 을 사용함.
const createPost = useMutation({
  // 뮤테이션 함수에는 매개변수가 필요하다. 물론 경우에 따라서는 없을 수도 있다.
  mutationFn: async (postData: ICreatePost) => {
    // 데이터 가져오는 로직 구현 역시 리턴은 필요하다.
  },
});

// 위에서 정의를 하면 아래와 같이 사용한다. 보통은 버튼을 클릭했을 때 실행되게 하기 위해 `onClick` 같은 곳에 넣어둔다.
// 위에서 정의한 부분에 함수가 매개변수를 받게 되어있다면 실행할 때에도 넘겨줘야한다.
createPost.mutate({
  // ... 데이터 ...
}, {
  // `mutate` 함수의 두번째 인자에는 요청 이후에 어떤 것을 할지가 들어가는데 `onSuccess`, `onError` 등등이 있다.
  // 이 부분을 사용해야하는데 첫번째 인자의 타입이 void인 경우(매개변수를 필요로 하지 않게 설정했을 경우)에는 그냥 null을 전달하고 두번째 인자를 전달하면 된다.
});

// 이렇게...
deletePost.mutate(null, {
  // 이렇게 하면 데이터를 넘기지 않고 옵션 사용이 가능하다.
});
```

```ts
const createPost = useMutation(
  async (postData: ICreatePost) => {
    const { data, } = await api.post<IBoard>('/boards', postData);
    return data;
  }, // 구버전은 마찬가지로 함수를 분리해서 작성했었다.
  {
    // 여기에 옵션 들어감.
  }
);
```

이정도만 알면 리액트 쿼리도 기본적인 부분은 사용할 수 있다.
