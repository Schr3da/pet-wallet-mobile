import {EndpointMethods, IEndpoints} from "../base";

import {createUrlForApi} from "../base";

const root = "wallet";

enum Ids {
  create = "create",
  update = "update",
  delete = "delete",
  find = "find",
  process = "process",
  deleteProcessed = "deleteProcessed"
}

const Routes: IEndpoints = {
  create: createUrlForApi(Ids.create, EndpointMethods.post, root, "create"), 
  update: createUrlForApi(Ids.update, EndpointMethods.post, root, "update"), 
  delete: createUrlForApi(Ids.delete, EndpointMethods.post, root, "delete"), 
  find: createUrlForApi(Ids.find, EndpointMethods.post, root, "find"), 
  process: createUrlForApi(Ids.process, EndpointMethods.post, root, "process"), 
  deleteProcessed: createUrlForApi(Ids.deleteProcessed, EndpointMethods.post, root, "deleteProcessed"), 
};

export {
  Ids,
  Routes
}
