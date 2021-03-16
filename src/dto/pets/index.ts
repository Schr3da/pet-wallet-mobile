
import * as Communication from "../../communication";
import {INewPetState} from "../../store/reducers/new-pet";
import {base64ImageString} from "../../components/common/utils";

export enum PetTypes {
  dog = "dog",
  cat = "cat",
  fish = "fish",
  bird = "bird",
  mice = "mice",
  hamster = "hamster",
  rat = "rat",
  hedgehog = "hedgehog",
  ferret = "ferret",
  chinchilla = "chinchilla",
  squirrel = "squirrel",
  snake = "snake",
  turtle = "turtle",
  horse = "horse",
  goat = "goat",
  pig = "pig",
  llama = "llama",
  alpaca = "alpaca",
  cow = "cow",
  burro = "burro",
  other = "others",
}

export interface IPetDto {
  id: string | null;
  name: string;
  dateOfBirth: Date | null;
  age: string | null;
  profileImage: string | undefined;
  profileUri: string | undefined;
  animal: string;
}

export const mapStateToPet = (
  data: INewPetState
): IPetDto => ({
  id: data.id,
  name: String(data.inputs.name),
  dateOfBirth: (data.inputs.dateOfBirth as Date) || null,
  age: String(data.inputs.age),
  profileImage: base64ImageString(data.profile) || undefined,
  profileUri: data.profile == null ? undefined : data.profile.uri,
  animal: String(data.inputs.animal),
});

export const mapFetchPetsResponseToPetDtos = (
  response: Communication.Dtos.PetDtos.IFetchPetsRequestDto | null
): IPetDto[] => {

  if (response == null) {
    return [];
  }

  return (response.pets|| [])
    .map(mapFindPetResponseToPetDto)
    .filter((p) => p != null) as IPetDto[];
}

export const mapFindPetResponseToPetDto = (
  data: Communication.Dtos.PetDtos.IFindPetResponseDto | null
): IPetDto | null => {
  if (data == null) {
    return null;
  }

  return {
    id: data.id,
    name: data.name,
    age: null,
    dateOfBirth: data.dateOfBirth == null ? null : new Date(data.dateOfBirth),
    profileImage: data.avatarImage || undefined,
    profileUri: undefined,
    animal: data.type,
  };
}
