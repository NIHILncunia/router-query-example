import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { persistor, store } from '@/src/store';

interface Props {
  children: React.ReactNode;
}

export function Providers({ children, }: Props) {
  const queryClient = new QueryClient({
    defaultOptions: {
      // useQuery의 기본 옵션을 여기서 부여할 수 있다.
      queries: {
        // 이렇게 하면 창에 포커싱 되었을 때 자동으로 쿼리를 돌리지 않는다.
        refetchOnWindowFocus: false,

        // 사이트를 이용하다 보면 데이터가 만료되는데 가져온 후 어느정도의 시간이 지나야 만료될 지 선택한다.
        // 만료된 후 자동으로 다시 쿼리를 돌린다.
        refetchInterval: 600000,
        // 설정한 만큼이 신선한 데이터이다.
        staleTime: 600000,
        // 실패했을 경우 자동으로 세번 재요청을 보내는 것이 기본값인데, 이를 비활성화한다.
        retry: false,
      },
      mutations: {
        retry: false,
      },
    },
  });

  // 다른거 볼 필요 없고 QueryClientProvider랑 ReactQueryDevtools만 보면 된다.
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools position='bottom' />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {children}
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  );
}
