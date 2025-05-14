import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

import type {
  GetArticleReqType,
  GetArticleResType,
  ArticleType,
  SearchArticleResType,
} from "./types";
import type { ResErrorType } from "../axios/types";

import { getArticlesApi, searchArticlesApi } from "./api";

export const useGetArticles = (data: GetArticleReqType) => {
  return useInfiniteQuery<GetArticleResType, ResErrorType, ArticleType[]>({
    retry: false,
    initialPageParam: "1",
    refetchOnMount: false,
    refetchInterval: false,
    refetchOnWindowFocus: false,
    queryKey: ["articles", data],
    refetchIntervalInBackground: false,
    select: (data) => data.pages.flatMap((page) => page.articles),
    queryFn: ({ pageParam = "1" }) => getArticlesApi(data, pageParam as string),
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage.articles.length) {
        return undefined;
      }

      return (allPages.length + 1).toString();
    },
  });
};

export const useSearchArticles = (query: string) => {
  return useQuery<SearchArticleResType, ResErrorType>({
    queryKey: ["searchArticles", query],
    queryFn: () => searchArticlesApi(query),
    enabled: !!query.trim(),
  });
};

export const ArticleService = {
  useGetArticles,
  useSearchArticles,
};
