const buildHeaders = (auth: HeadersInit): Headers => {
  const headers = new Headers(auth);
  headers.set("Content-Type", "application/json");
  return headers;
};

export default buildHeaders;
