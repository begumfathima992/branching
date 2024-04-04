import { SerializedError } from "@reduxjs/toolkit";
import {
  ExtendedFetchBaseQueryError,
  IGeneralResponse,
} from "../types/IGeneral";
import { toast } from "react-toastify";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { dataPurifier } from "./dataPurifier";

export type ResponseOPT<T> = {
  successMessage?: string;
  errorMessage?: string;
  onSuccess?: (res: IGeneralResponse<T>) => void;
  onError?: (
    res: ExtendedFetchBaseQueryError | SerializedError | FetchBaseQueryError
  ) => void;
};

const showSuccessMessage = (message: string) => {
  toast.success(dataPurifier(message));
};
const showErrorMessage = (message: string) => {
  toast.error(dataPurifier(message));
};

export function handleResponse<T extends object | []>(
  res:
    | IGeneralResponse<T>
    | { data: unknown }
    | {
        error:
          | ExtendedFetchBaseQueryError
          | SerializedError
          | FetchBaseQueryError;
      },
  options?: ResponseOPT<T>
) {
  const { onSuccess, errorMessage, successMessage, onError } = options || {};
  if ("data" in res) {
    const data = res.data as IGeneralResponse<T>;
    if ("message" in data) {
      showSuccessMessage(successMessage || (data.message as string));
      onSuccess && onSuccess(res as IGeneralResponse<T>);
      return;
    }
    showSuccessMessage(successMessage || "Operation Successfull");

    onSuccess && onSuccess(res as IGeneralResponse<T>);
  } else if ("error" in res) {
    const error = res.error;
    if ("status" in error) {
      const data = error.data as ExtendedFetchBaseQueryError;
      if (data && "Error" in data) {
        const err = data.Error;
        showErrorMessage(errorMessage || (err as string));
      }
    }
    onError && onError(error);
  }
}
