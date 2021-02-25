const baseUrl = "https://wallet.pet-care.rocks";

enum RequestMethods {
  get = "GET",
  post = "POST",
  delete = "DELETE",
  update = "UPDATE",
}

const getHeader = (token?: string) => {
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  if (token == null) {
    return headers;
  }

  return {
    ...headers,
    token,
  };
};

const request = <S, T>(
  method: RequestMethods,
  endpoint: string,
  params: S,
  token?: string,
): Promise<T> =>
  fetch(baseUrl + endpoint, {
    method,
    headers: getHeader(token),
    body: JSON.stringify(params),
  })
    .then((response) => response.json())
    .catch(() => Promise.reject());

export const getRequest = <S, T>(url: string, params: S, token?: string) =>
  request<S, T>(RequestMethods.get, url, params, token);

export const postRequest = <S, T>(url: string, params: S, token?: string) =>
  request<S, T>(RequestMethods.post, url, params, token);

export const updateRequest = <S, T>(url: string, params: S, token?: string) =>
  request<S, T>(RequestMethods.update, url, params, token);

export const deleteRequest = <S, T>(url: string, params: S, token?: string) =>
  request<S, T>(RequestMethods.delete, url, params, token);
