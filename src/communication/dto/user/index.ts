import {UUID} from "../uuid";

export interface IUserRequestDto {
  nickname: string;
}

export interface IUserResponseDto {
  id: UUID;
  nickname: string;
  token: string;
  created: Date;
}
