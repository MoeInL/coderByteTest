export type ArticleType = {
  url: string;
  image: string;
  title: string;
  content: string;
  description: string;
  publishedAt: string;
  source: {
    url: string;
    name: string;
  };
};

/**** Get article response type*****/
export type GetArticleResType = {
  totalArticles: number;
  articles: ArticleType[];
};
export type GetArticleReqType = {
  category: string;
};

/**** Search article response type*****/
export type SearchArticleResType = {
  totalArticles: number;
  articles: ArticleType[];
};
