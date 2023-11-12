export type TResult<TName> = {
  name: string;
  status: string;
  image: string;
  location: TName;
  species: string;
  origin: TName;
};
export type TError = {
  error: string;
};
export type TRequest = {
  info: String;
  results: [];
};
