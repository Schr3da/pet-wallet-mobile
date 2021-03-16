import SQLite from "react-native-sqlite-storage";

export const executeQuery = <T>(
  command: string,
  params: T[] = [],
): Promise<SQLite.ResultSet | null> =>
  new Promise((resolve) =>
    instance.transaction((transaction: SQLite.Transaction) =>
      transaction.executeSql(
        command,
        params,
        (_: SQLite.Transaction, results: SQLite.ResultSet) => resolve(results),
        () => resolve(null),
      ),
    ),
  );

export const createTable = (name: string, params: string) =>
  executeQuery(`CREATE TABLE IF NOT EXISTS ${name} (${params})`, []);

export const insert = <T>(table: string, fields: string[], values: T[]) => {
  const placeholder = fields.reduce(
    (result, _, index) => result + (index === 0 ? "?" : ", ?"),
    "",
  );
  const query = `INSERT INTO ${table} (${(
    fields || []
  ).toString()}) VALUES (${placeholder})`;
  return executeQuery(query, values);
};

export const select = async <T>(
  table: string,
  params?: string,
): Promise<T[] | null> => {
  const result = await executeQuery(
    `SELECT * FROM ${table} ${params || ""}`,
    [],
  );
  if (result == null) {
    return Promise.resolve(null);
  }
  return Promise.resolve(result.rows.raw());
};

export const update = async <T>(
  table: string,
  fields: string[],
  values: T[],
): Promise<T[] | null> => {
  const placeholder = fields.reduce(
    (result, value, index) =>
      result + value + "=" + (index === 0 ? "?" : ", ?"),
    "",
  );

  const result = await executeQuery(
    `UPDATE ${table} SET ${placeholder}`,
    values,
  );

  if (result == null) {
    return Promise.resolve(null);
  }

  return Promise.resolve(result.rows.raw());
};

let instance: SQLite.SQLiteDatabase;

const databaseParams = (): SQLite.DatabaseParams => ({
  name: "pet-wallet-9",
  location: "default",
});

export const init = (): Promise<boolean> => {
  return new Promise((resolve) => {
    instance = SQLite.openDatabase(
      databaseParams(),
      () => resolve(true),
      () => resolve(false),
    );
  });
};

export const deleteDatabase = (): Promise<void> => {
  return new Promise((resolve) => {
    if (instance != null) {
      instance.close();
    }

    SQLite.deleteDatabase(
      databaseParams(),
      () => resolve(),
      () => resolve(),
    );
  });
};
