import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {
  HomePage, QueryGet
} from './pages';

import './styles/tailwind.css';
import 'react-toastify/dist/ReactToastify.css';
import { Providers } from './layouts';

const root = document.getElementById('root') as HTMLElement;

const routerApp = (
  <Providers>
    <BrowserRouter>
      <Routes>
        {/* path는 주소를 나타냄. element는 그 주소에 접근했을 때 보이는 컴포넌트를 나타냄. */}
        <Route path='/' element={<HomePage />} />
        {/* Route 아래에  Route를 두면 하위 라우팅을 할 수 있음. */}
        {/* element가 없는 이유는 하위 라우팅의 방식이 상위 라우트의 특정 부분에 하위 라우팅 컴포넌트를 렌더링하기 때문. element가 없으면 아무것도 없는 상태에서 렌더링되는 효과를 가짐. */}
        <Route path='/react-query'>
          {/* 하위는 그냥 이렇게 만들어주면 됨. get 이라고 적은 경우, /react-query/get 이라는 주소가 됨. */}
          <Route path='get' element={<QueryGet />} />
          {/* <Route path='/post' />
          <Route path='/patch' />
          <Route path='/delete' /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  </Providers>
);

ReactDOM.createRoot(root).render(routerApp);
