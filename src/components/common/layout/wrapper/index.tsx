import * as React from "react";

import {View, ViewStyle, ScrollView} from "react-native";

import {ViewComponents, SubViewComponents} from "../../../../store/actions/navigation";

interface ILayoutWrapperProps {
  mainViewComponent: ViewComponents;
  subViewComponent: SubViewComponents;
  style: ViewStyle;
  children: any
}

export const LayoutWrapper = (
  {mainViewComponent, subViewComponent, style, children}: ILayoutWrapperProps
) => mainViewComponent === ViewComponents.welcome &&
  subViewComponent === SubViewComponents.welcomeWithPets ? 
  <View style={style}>{children}</View> :
  <ScrollView 
    bounces={true}
    style={style}
    nestedScrollEnabled={true}
    showsHorizontalScrollIndicator={false}
    showsVerticalScrollIndicator={false}
  >{children}</ScrollView>;
