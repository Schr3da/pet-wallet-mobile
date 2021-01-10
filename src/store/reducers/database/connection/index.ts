import { Connection, createConnection } from "typeorm/browser";

import SQLite from "react-native-sqlite-storage";

import * as Entities from "../entities/index";

SQLite.DEBUG(process.env.NODE_ENV === "development");
SQLite.enablePromise(true);

const initConnection = async (): Promise<Connection | null> => {
  try {
    const connection = await createConnection({
      type: "react-native",
      database: "test",
      location: "default",
      logging: ["error", "query", "schema"],
      synchronize: true,
      entities: [Entities.Settings],
    });

    return connection;
  } catch (error) {
    return Promise.resolve(null);
  }
};

let instance: Connection | null = null;

export const getDbConnectionInstance = 
  async (): Promise<Connection | null> => instance == null ? 
    await initConnection() : Promise.resolve(instance);
