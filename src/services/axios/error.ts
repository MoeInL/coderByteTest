export const withErrorCatch = async <
  T,
  E extends new (message?: string) => Error
>(
  promise: Promise<T>,
  errorsToCatch?: E[]
): Promise<[T, undefined] | [undefined, E]> => {
  try {
    const data = await promise;

    const result: [T, undefined] = [data, undefined];

    return result;
  } catch (e) {
    const error = e as E;

    if (!Array.isArray(errorsToCatch)) {
      return [undefined, error];
    }

    if (errorsToCatch.includes(error)) {
      return [undefined, error];
    }

    return [undefined, error];
  }
};
