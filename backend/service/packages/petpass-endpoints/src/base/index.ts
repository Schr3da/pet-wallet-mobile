export enum EndpointMethods {
  get = "get",
  post = "post",
  update = "update",
  delete = "delete",
}

export interface IEndpoints {
  [id: string]: IEndpoint;
}

export interface IEndpoint {
  id: string;
  url: string;
  method: EndpointMethods;
}

enum Root {
  api = "/api/petpass",
}

const createUrlFrom= (
  root: Root, 
  urls: string[]
): string =>
  (urls || []).reduce((result, url) => {
    console.log('create url ' + `${result}/${url}`);
    return `${result}/${url}`;
}, root);

export const createUrlForApi = (
  id: string,
  method: EndpointMethods,
  ...urls: string[]
): IEndpoint => ({
  id,
  method, 
  url: createUrlFrom(Root.api, urls),
})
