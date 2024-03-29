import {InputTypes} from "../../enums/layout";

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
  profileImage: string | undefined;
  profileUri: string | undefined;
  animal: string;
}

export interface INotesDto {
  id: string;
  title: string;
  body: string;
}

export interface IScanDto {
  id: string;
  title: string;
  description: string;
  medicineId: string;
  isSelected: boolean;
}
