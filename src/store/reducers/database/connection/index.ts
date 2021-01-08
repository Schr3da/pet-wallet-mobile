import { Connection, createConnection } from "typeorm/browser";

import * as Entities from "../entities/index";

export const initConnection = async (): Promise<Connection | null> => {
  try {
    const connection = await createConnection({
      type: "react-native",
      database: "app",
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

export const getDbConnectionInstance = async () => 
  instance == null ? 
    await initConnection() : instance;
