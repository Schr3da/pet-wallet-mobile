export enum ViewComponents {
  splash = "splash",
  welcome = "welcome",
}

export const ON_CHANGE_VIEW_COMPONENT = "ON_CHANGE_VIEW_COMPONENT";
interface IOnChangeViewComponent {
  type: typeof ON_CHANGE_VIEW_COMPONENT;
  next: ViewComponents;
}

export const onChangeViewComponent = (
  next: ViewComponents 
): IOnChangeViewComponent => ({
  type: ON_CHANGE_VIEW_COMPONENT,
  next, 
});

export type Actions = 
  | IOnChangeViewComponent 
;
