import type {ITheme} from "../theme";

import {DisplayModes} from "../store/actions/layout";

export const applyStyles = (
  isApplePlatform: boolean,
  displayMode: DisplayModes
) => (theme: ITheme) => ({
  safeAreaView: {
    flex: 1,
    backgroundColor: theme.color1,
  },
  container: {
    flex: 1,
    marginTop: isApplePlatform ? 0 : displayMode === DisplayModes.portrait ? 30 : 20,
    marginBottom: isApplePlatform ? 0 : 10,
    marginLeft: 20,
    marginRight: 20,
  },
});
