export enum PetTypes {
  dog,
  cat, 
  fish,
  bird,
  mice,
  hamster,
  rat,
  hedgehog,
  ferret,
  chinchilla,
  squirrel,
  snake,
  turtle,
  horse,
  goat,
  pig,
  llama,
  alpaca,
  cow,
  burro,
  other,
};

export interface IPetDto {
  id: string;
  name: string;
  dateOfBirth: string;
  age: string;
  profileImage: string | undefined;
  profileUri: string | undefined;
  animal: string;
}
