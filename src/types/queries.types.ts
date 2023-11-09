import { AxiosError } from 'axios';
import {
  QueryObserverResult, RefetchOptions, RefetchQueryFilters, UseMutateFunction, UseQueryOptions
} from '@tanstack/react-query';

export interface IQueryType<T> {
  data: T;
  error?: AxiosError;
  isLoading?: boolean;
  isError?: boolean;
  isFetching?: boolean;
  isSuccess?: boolean;
  // eslint-disable-next-line no-unused-vars
  refetch?: <TPageData>(options?: RefetchOptions & RefetchQueryFilters<TPageData>) => Promise<QueryObserverResult<T, AxiosError<unknown, any>>>
}

export interface IMutationType<T, P> {
  mutate: UseMutateFunction<T, AxiosError, P, unknown>;
  error?: AxiosError;
  isLoading?: boolean;
  isError?: boolean;
  isSuccess?: boolean;
}

export type IQueryOptions<T> = UseQueryOptions<T>;

export interface IQueryParameter<T> {
  key: Array<string> | Array<string | number>;
  api: string;
  options?: IQueryOptions<T>
}

export interface IMutationParameter {
  api: string;
  multiPart?: boolean;
}
