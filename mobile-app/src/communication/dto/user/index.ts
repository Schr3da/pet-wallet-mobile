export interface ICreateUserRequestDto {
  nickname: string;
}

export interface ICreateUserResponseDto {
  id: string;
  nickname: string;
  token: string;
  created: Date;
}
