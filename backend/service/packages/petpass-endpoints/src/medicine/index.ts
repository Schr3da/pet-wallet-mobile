import {EndpointMethods, IEndpoints} from "../base";

import {createUrlForApi} from "../base";

const root = "medicine";

enum Ids {
  findById = "findById",
  findBySearchTerm = "findBySearchTerm",
  findAll = "findAll"
}

const Routes: IEndpoints = {
  findById: createUrlForApi(Ids.findById, EndpointMethods.post, root, "findById"),
  findBySearchTerm: createUrlForApi(Ids.findBySearchTerm, EndpointMethods.post, root, "findBySearchTerm"),
  findAll: createUrlForApi(Ids.findAll, EndpointMethods.post, root, "findAll")
};

export {
  Ids,
  Routes
}