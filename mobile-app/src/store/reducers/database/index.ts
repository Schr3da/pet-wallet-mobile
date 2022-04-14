import {Database, Layout} from "../../actions";
import {IUserEntity} from "./db/user";

export interface IDatabaseState {
  hasLoadedDatabase: boolean;
  token: string | null;
}

const initialState = (): IDatabaseState => ({
  hasLoadedDatabase: false,
  token: null,
});

const handleInitDatabase = (
  state: IDatabaseState,
  user: IUserEntity | null,
): IDatabaseState => {
  const nextState = {...state};

  nextState.hasLoadedDatabase = true;

  if (user == null) {
    return nextState;
  }

  nextState.token = user.uuid;

  return nextState;
};

type Actions = Database.Actions | Layout.Actions;

const reducer = (state = initialState(), action: Actions) => {
  switch (action.type) {
    case Database.ON_INIT_DATA_FROM_DATABASE:
      return handleInitDatabase(state, action.user);
    case Database.ON_LOADED_DATA_FROM_DATABASE:
      return state;
    case Database.ON_REQUEST_DATA_DELETION:
      return initialState();
    default:
      return state;
  }
};

export const database = reducer;
