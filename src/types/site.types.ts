export interface ISiteData {
  title: string;
  url: string;
  image: string;
  keywords: string;
  description: string;
  author: string;
  type: string;
  version: string;
}

export interface IMetaData {
  title: string;
  url?: string;
  description?: string;
  tags?: string;
  keywords?: string;
  image?: string;
  type?: string;
  section?: string;
  author?: string;
  created?: string;
  updated?: string;
}

export interface IAppLayoutProps extends IMetaData {
  children: React.ReactNode;
}
