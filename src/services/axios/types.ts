export type ResSuccessType<T> = T & {
  message: string | null;
};

export type ResErrorType<
  T extends object = {
    [Key: string]: string[];
  }
> = {
  message: string;
  errors: {
    [Key in keyof T]?: string[];
  };
};
