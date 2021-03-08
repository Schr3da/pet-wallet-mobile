import {UUID} from "../uuid";

export interface IPetDto {
  id?: UUID;
  name: string;
  avatarImage: string | null;
  type: string;
  age: string;
  dateOfBirth: string | null;
}
