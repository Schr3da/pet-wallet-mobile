import SQLite from "react-native-sqlite-storage";

export const executeQuery = (
  command: string,
  params = []
): Promise<SQLite.ResultSet | null> => new Promise(async (resolve) =>
  instance.transaction((transaction) =>
    transaction.executeSql(command, params, 
      (_, results) => resolve(results),
      () => resolve(null)
)));

export const createTable = async (
  name: string,
  params: string
) => executeQuery(`CREATE TABLE IF NOT EXISTS ${name} (${params})`,[]);

export const dropDatabase = async () => executeQuery("DROP DATABASE app");

export const insert = async (
  table: string,
  fields: string[], 
  values: any,
) => {
  const placeholder = fields.reduce((result, _, index) => result + (index === 0 ? "?" : ", ?"), "");
  const query = `INSERT INTO ${table} (${(fields || []).toString()}) VALUES (${placeholder})`;
  return executeQuery(query, values);
}

export const select = async <T>(
  table: string,
  params?: string,
): Promise<T[] | null> => {
  const result = await executeQuery(`SELECT * FROM ${table} ${(params || "")}`,[]);
  if (result == null) {
    return Promise.resolve(null);
  }
  return Promise.resolve(result.rows.raw());
}

let instance: SQLite.SQLiteDatabase;

export const init = (): Promise<boolean> => {
  return new Promise(async (resolve) => {
    const params: SQLite.DatabaseParams = {
      name: "app",
      location: "default"
    };

    instance = SQLite.openDatabase(params, 
      () => resolve(true),
      () => resolve(false), 
    );
  });
};
