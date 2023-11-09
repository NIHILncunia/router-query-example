import Cookies, { CookieSetOptions, CookieGetOptions } from 'universal-cookie';
import { ICookies } from '@/src/types/dto.types';

const cookies = new Cookies();

export const getAllCookie = (): ICookies => {
  const allCookies = cookies.getAll();
  return Object.keys(allCookies).reduce((obj, key) => {
    let value = allCookies[key];
    try {
      value = JSON.parse(value);
    } catch (error) {
      console.log(error);
    }
    return { ...obj, [key]: value, };
  }, {}) as ICookies;
};

export const getCookie = <T>(name: keyof ICookies, options?: CookieGetOptions) => {
  const cookie = cookies.get(name, options);

  if (!cookie) {
    return null;
  }

  return JSON.parse(cookie) as T;
};

export const setCookie = (name: keyof ICookies, value: any, options?: CookieSetOptions) => {
  cookies.set(name, value, options);
};

export const removeCookie = (name: keyof ICookies, options?: CookieSetOptions) => {
  cookies.remove(name, options);
};
