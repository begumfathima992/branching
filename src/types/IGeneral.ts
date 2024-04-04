import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { QueryReturnValue } from "@reduxjs/toolkit/dist/query/baseQueryTypes";

export type IPagination = {
  total: number;
  current_page: string;
  per_page: string;
  total_pages: number;
};


type IQueryError = {
  error: {
    data: {
      success: false;
      Error: string;
    };
    status: number;
  };
};

export type ExtendedFetchBaseQueryError = FetchBaseQueryError & IQueryError;

export type IGeneralResponse<T> = T;

export type QueryRes<T> = QueryReturnValue<T, ExtendedFetchBaseQueryError>;
