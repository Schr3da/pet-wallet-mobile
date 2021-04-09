import {Navigation, PetDetails} from "../../actions";
import {ON_GO_BACK_NAVIGATION} from "../../actions/navigation";
import {ON_SET_PROFILE_IMAGE_PET_DETAILS} from "../../actions/pet-details";
import {IImageDataDto} from "../../../dto/image";

export interface IPetDetailsState {
  newProfile: IImageDataDto | null;
}

const initialState = (): IPetDetailsState => ({
  newProfile: null,
});

const handleNewProfileImage = (
  state: IPetDetailsState,
  data: IImageDataDto,
): IPetDetailsState => {
  return {
    ...state,
    newProfile: data,
  };
};

type Actions = Navigation.Actions | PetDetails.Actions;

const reducer = (state: IPetDetailsState = initialState(), action: Actions) => {
  switch (action.type) {
    case ON_GO_BACK_NAVIGATION:
      return initialState();
    case ON_SET_PROFILE_IMAGE_PET_DETAILS:
      return handleNewProfileImage(state, action.data);
    default:
      return state;
  }
};

export const petDetails = reducer;
