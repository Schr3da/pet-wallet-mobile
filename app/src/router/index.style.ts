import type {ITheme} from "../theme";

import {DisplayModes} from "../enums/layout";

export const applyStyles = (
  isApplePlatform: boolean,
  displayMode: DisplayModes,
) => (theme: ITheme) => ({
  safeAreaView: {
    flex: 1,
    backgroundColor: theme.color1,
  },
  container: {
    flex: 1,
    marginTop: isApplePlatform
      ? 0
      : displayMode === DisplayModes.portrait
      ? 20
      : 0,
    marginBottom: isApplePlatform ? 0 : 6,
    marginLeft: 20,
    marginRight: 20,
  },
  loader:
    displayMode === DisplayModes.portrait
      ? {
          top: isApplePlatform ? 10 : 0,
        }
      : {
          bottom: isApplePlatform ? 20 : 0,
        },
});
