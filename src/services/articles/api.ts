import axios, { AxiosError } from "axios";
import { withErrorCatch } from "../axios/error";

import type {
  GetArticleReqType,
  GetArticleResType,
  SearchArticleResType,
} from "./types";

/*** API to get articles ***/
const getArticlesApi = async (data: GetArticleReqType, page: string) => {
  const [response, error] = await withErrorCatch(
    axios.get<GetArticleResType>(
      `https://gnews.io/api/v4/top-headlines?category=${data.category}&apikey=e60a89ae44843f7c200dc24da1c761cd&page=${page}`
    )
  );

  if (error instanceof AxiosError) {
    throw error.response?.data;
  } else if (error) {
    throw error;
  }

  return response?.data;
};

/*** API to search articles ***/
const searchArticlesApi = async (query: string) => {
  const [response, error] = await withErrorCatch(
    axios.get<SearchArticleResType>(
      `https://gnews.io/api/v4/search?q=${query}&apikey=e60a89ae44843f7c200dc24da1c761cd`
    )
  );

  if (error instanceof AxiosError) {
    throw error.response?.data;
  } else if (error) {
    throw error;
  }

  return response?.data;
};

export { getArticlesApi, searchArticlesApi };
