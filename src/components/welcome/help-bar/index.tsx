import {ILayoutChildProps} from "components/common/layout";
import * as React from "react";

import {Text, View} from "react-native";
import {useDispatch} from "react-redux";

import {onChangeViewComponent, ViewComponents} from "../../../store/actions/general";
import {createStyle, getColors} from "../../../theme";
import {StyledButton} from "../../common";

import {applyStyles} from "./index.style";

const handleHelp = (
  dispatch: React.Dispatch<any>
) => dispatch(onChangeViewComponent(ViewComponents.help)); 

export const HelpBar = (
  props: ILayoutChildProps
): JSX.Element =>  { 
  const dispatch = useDispatch();

  const {theme} = props;
  const colors = getColors(theme);
  const styles = createStyle(theme, applyStyles); 

  return (
    <View style={styles.buttonWrapper as any}>
      <StyledButton 
        style={styles.button} 
        color={colors.color3} 
        onPress={() => handleHelp(dispatch)}
      >
        <Text style={styles.buttonText}>
          Brauchst du Hilfe?
        </Text> 
      </StyledButton>
    </View>
  );
};
