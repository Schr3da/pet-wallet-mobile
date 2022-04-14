import {EndpointMethods, IEndpoints} from "../base";

import {createUrlForApi} from "../base";

const root = "user";

enum Ids {
  create = "create",
  update = "update",
  delete = "delete",
  find = "find",
}

const Routes: IEndpoints = {
  create: createUrlForApi(Ids.create, EndpointMethods.post, root, "create"), 
  update: createUrlForApi(Ids.update, EndpointMethods.post, root, "update"), 
  delete: createUrlForApi(Ids.delete, EndpointMethods.post, root, "delete"), 
  find: createUrlForApi(Ids.find, EndpointMethods.post, root, "find"), 
};

export {
  Ids,
  Routes
}
