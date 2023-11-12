import axios from "axios";
import { TError } from "../types/types";

const getErrorMessage = (error: unknown): string => {
  let message: string;

  if (error instanceof Error) {
    message = error.message;
  } else if (error && typeof error === "object" && "message" in error) {
    message = String(error.message);
  } else if (typeof error === "string") {
    message = error;
  } else {
    message = "unknown errpr";
  }
  return message;
};
const fetchCharacters = async <TData>(
  url: string,
  method: string,
  page: number
): Promise<TData | TError> => {
  try {
    const response = await axios({
      method: method,
      url: url,
      params: { page: page },
    });
    return response.data;
  } catch (error) {
    return { error: getErrorMessage(error) };
  }
};
export default fetchCharacters;
