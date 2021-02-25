import {UUID} from "../uuid";

export interface IPetDto {
  id: UUID;
  userId: UUID;
  name: string;
  avatarImage: string | null; // file path to avatar image
  type: string; // e.g. 'cat', 'dog'
  dateOfBirth: Date | null;
  created: Date;
}
