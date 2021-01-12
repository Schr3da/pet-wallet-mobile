import {createConnection} from "typeorm/browser";

import SQLite from "react-native-sqlite-storage";

import {Settings} from "./entities";

let dbInstance = null;

export const initDatabase = (): Promise<boolean> => {
  return new Promise(async (resolve) => {
    const params: SQLite.DatabaseParams = {
      name: "app.db",
      location: "default"
    };

    dbInstance = SQLite.openDatabase(
      params, 
      () => resolve(true), 
      () => resolve(false), 
    );
  });
};

let connection = null;

export const initORM = async (): Promise<boolean> => {
  try {
    const params = {
      database: "app.db",
      location: "default",
      type: "react-native" as "react-native",
      entities: [Settings]
    };

    connection = await createConnection(params);  
    connection.synchronize(false);
    return Promise.resolve(true);
  } catch {
    return Promise.resolve(false);
  }
}
