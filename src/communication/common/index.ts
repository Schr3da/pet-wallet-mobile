import {isDev} from "../../components/common/utils";

export const baseUrl = "https://wallet.pet-care.rocks";

enum RequestMethods {
  get = "GET",
  post = "POST",
  delete = "DELETE",
  update = "UPDATE",
}

const getHeader = (token?: string) => {
  const headers = {
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
    mode: "cors",
    headers: getHeader(token),
    body: JSON.stringify(params),
  })
    .then((response) => {
      if (isDev()) {
        console.log(response);
      }

      if (response.ok === false || response.status !== 200) {
        return Promise.reject();
      }

      return response.text();
    })
    .then((body: string | undefined) => {
      if (body == null) {
        return Promise.reject();
      }

      try {
        return JSON.parse(body);
      } catch (e) {
        console.log("json parse error: ", e);
        return Promise.reject();
      }
    })
    .catch((e) => {
      console.log("connection error: ", e);
      return Promise.reject();
    });

export const getRequest = <S, T>(url: string, params: S, token?: string) =>
  request<S, T>(RequestMethods.get, url, params, token);

export const postRequest = <S, T>(url: string, params: S, token?: string) =>
  request<S, T>(RequestMethods.post, url, params, token);

export const updateRequest = <S, T>(url: string, params: S, token?: string) =>
  request<S, T>(RequestMethods.update, url, params, token);

export const deleteRequest = <S, T>(url: string, params: S, token?: string) =>
  request<S, T>(RequestMethods.delete, url, params, token);
