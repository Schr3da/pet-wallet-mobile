import {IEndpoints, EndpointMethods, createUrlForApi} from "../base";

const root = "service";

enum Ids {
  status = "status",
}

const Routes: IEndpoints = {
  status: createUrlForApi(Ids.status, EndpointMethods.get, root, "status"),
};

export {
  Ids,
  Routes,
}
