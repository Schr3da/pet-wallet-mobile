import * as Database from "../../actions/database";
import {getSettingsRepository} from "./repositories";

export interface IDatabaseState {
  hasLoadedDatabase: boolean;
}

const initialState = (): IDatabaseState => ({
  hasLoadedDatabase: false, 
});

const handleInitDatabase = async (
  state: IDatabaseState
) => {

  let repo = getSettingsRepository();
  console.log(await repo.count());

  return {...state,
    hasLoadedDatabase: true,
  };
};

type Actions = Database.Actions;

const reducer = (
  state = initialState(),
  action: Actions, 
) => {
  switch (action.type) {
    case Database.ON_INIT_DATA_FROM_DATABASE:
      return handleInitDatabase(state);
    case Database.ON_LOADED_DATA_FROM_DATABASE:
      return state;
    default:
      return state;
  }
}

export const database = reducer;
