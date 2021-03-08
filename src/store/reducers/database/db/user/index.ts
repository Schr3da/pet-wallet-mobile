import * as Communication from "../../../../../communication";

import {createTable, select, insert} from "../query";

export interface IUserEntity {
  uuid: string;
}

export const initUserTable = async (isOnline: boolean) => {
  const user = await getUser();

  if (user != null && (user.uuid || "").length !== 0) {
    return user;
  }

  if (isOnline === false) {
    return null;
  }

  const data = await Communication.User.register();
  if (data == null) {
    return null;
  }

  await createTable("user", "id INTEGER PRIMARY KEY NOT NULL, uuid Text");

  await insert("user", ["id", "uuid"], [1, data.token]);
};

export const getUser = async (): Promise<IUserEntity | null> => {
  try {
    const data = (await select("user")) || [];

    if (data.length === 0) {
      return null;
    }

    return data[0] as IUserEntity;
  } catch (_) {
    return null;
  }
};
