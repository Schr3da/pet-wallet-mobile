import * as React from "react";

import {Text, View, ViewStyle} from "react-native";
import {useDispatch} from "react-redux";

import {ILayoutChildProps} from "../../common/layout";
import {onChangeViewComponent} from "../../../store/actions/navigation";
import {createStyle, getColors} from "../../../theme";
import {LanguageTypes} from "../../../language";
import {StyledButton} from "../../common";

import {applyStyles} from "./index.style";
import {ViewComponents, SubViewComponents} from "../../../enums/navigation";

const addNewPet = (dispatch: any, language: LanguageTypes) => {
  dispatch(
    onChangeViewComponent(
      ViewComponents.newPet,
      SubViewComponents.newPetInformation,
      language,
    ),
  );
};

interface IProps extends ILayoutChildProps {
  style?: ViewStyle;
}

export const AddPetBar = (props: IProps): JSX.Element => {
  const {theme, language, languageType, hasPets, style} = props;

  const dispatch = useDispatch();

  const styles = createStyle(theme, applyStyles);
  const colors = getColors(theme);

  let {button, description} = hasPets
    ? language.welcome.welcomeWithPets.addPetBar
    : language.welcome.welcomeNoPets.addPetBar;

  return (
    <View style={{...styles.container, ...(style || {})}}>
      <Text style={styles.text}>{description}</Text>
      <StyledButton
        color={colors.color3}
        style={styles.button}
        title={button}
        onPress={() => addNewPet(dispatch, languageType)}
      />
    </View>
  );
};
