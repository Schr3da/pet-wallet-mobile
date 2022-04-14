import { EndpointMethods, IEndpoints } from "../base";

import { createUrlForApi } from "../base";

const root = "contact";

enum Ids {
    registerForNewsletter = "registerForNewsletter"
}

const Routes: IEndpoints = {
    registerForNewsletter: createUrlForApi(Ids.registerForNewsletter, EndpointMethods.post, root, "registerForNewsletter"),
};

export {
    Ids,
    Routes
}