import {IPetsState} from "../../store/reducers/pets";
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
  profileUri: data.profile?.uri || undefined,
  animal: String(data.inputs.animal),
});
