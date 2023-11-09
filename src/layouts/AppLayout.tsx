import React from 'react';
import { useLocation } from 'react-router';
import tw, { css } from 'twin.macro';
import { Global } from '@emotion/react';
import { ToastContainer } from 'react-toastify';
import {
  Footer, Header, Main, Meta, Nav
} from '@/src/components/Layout';
import { IAppLayoutProps, IMetaData } from '@/src/types/site.types';

export function AppLayout({
  children, title, description, keywords, author, image, created, updated, tags, type, section,
}: IAppLayoutProps) {
  const { pathname, search, } = useLocation();

  const meta: IMetaData = {
    title,
    url: pathname + search,
    description,
    keywords,
    author,
    image,
    tags,
    type,
    section,
    created,
    updated,
  };

  const style = {
    global: css([
      '@import url(https://fonts.googleapis.com/earlyaccess/notosanskr.css)',
      tw` [*]:( box-border m-0 p-0 font-sans ) `,
    ]),
  };

  return (
    <>
      <Global styles={style.global} />
      <Meta meta={meta} />

      <Main>{children}</Main>
    </>
  );
}
