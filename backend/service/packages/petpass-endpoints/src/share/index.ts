import {EndpointMethods, IEndpoints} from "../base";

import {createUrlForApi} from "../base";

const root = "share";

enum Ids {
  create = "create",
  find = "find",
  delete = "delete"
}

const Routes: IEndpoints = {
  create: createUrlForApi(Ids.create, EndpointMethods.post, root, "create"), 
  find: createUrlForApi(Ids.find, EndpointMethods.post, root, "find"),
  delete: createUrlForApi(Ids.find, EndpointMethods.post, root, "delete")
};

export {
  Ids,
  Routes
}