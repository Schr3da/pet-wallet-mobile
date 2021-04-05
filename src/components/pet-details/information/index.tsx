import * as React from "react";

import * as EditView from "./edit";
import * as ReadOnlyView from "./read-only";

import {ErrorTypes} from "../../../enums/layout";
import {onSetErrorCode} from "../../../store/actions/layout";

import {ILayoutChildProps} from "../../common/layout";
import {IPetDto} from "../../../dto/pets";
import {SubViewComponents} from "../../../enums/navigation";

export const handleError = (dispatch: any, errorType: ErrorTypes) =>
  dispatch(onSetErrorCode(errorType));

export interface IProps extends ILayoutChildProps {
  data: IPetDto;
}

export const ChildView = (props: IProps): JSX.Element => {
  const {subViewComponent, data} = props;

  return (
    <React.Fragment>
      {subViewComponent === SubViewComponents.petDetailsEdit ? (
        <EditView.ChildView {...props} data={data} />
      ) : (
        <ReadOnlyView.ChildView {...props} data={data} />
      )}
    </React.Fragment>
  );
};

export const Footer = (props: ILayoutChildProps): JSX.Element => {
  const {subViewComponent} = props;

  return (
    <React.Fragment>
      {subViewComponent === SubViewComponents.none ? null : (
        <EditView.Footer {...props} />
      )}
    </React.Fragment>
  );
};

export const Dialogs = (props: IProps): JSX.Element | null => {
  const {subViewComponent} = props;

  switch (subViewComponent) {
    case SubViewComponents.none:
      return <ReadOnlyView.Dialogs {...props} />;
    case SubViewComponents.petDetailsEdit:
      return <EditView.Dialogs {...props} />;
    default:
      return null;
  }
};
