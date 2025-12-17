export const getUrlWithType = (
  newType: string | null,
  searchParamsString: string,
  baseRoute: string
): string => {
  const params = new URLSearchParams(searchParamsString);
  if (newType) {
    params.set("type", newType);
  } else {
    params.delete("type");
  }
  const queryString = params.toString();
  return queryString ? `${baseRoute}?${queryString}` : baseRoute;
};
