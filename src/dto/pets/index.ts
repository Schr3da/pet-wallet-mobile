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
  id: string;
  name: string;
  dateOfBirth: string;
  age: string;
  profileImage: string | undefined;
  profileUri: string | undefined;
  animal: string;
}
