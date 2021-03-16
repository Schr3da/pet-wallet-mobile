export interface ICreatePetRequestDto {
  name: string;
  type: string;
  dateOfBirth: number | null;
  avatarImage: string | null;
}

export interface ICreatePetResponseDto {
  id: string;
  name: string;
  type: string;
  avatarImage: string | null;
  created: Date;
  dateOfBirth: number | null;
}

export interface IUpdatePetRequestDto {
  id: string;
  name: string;
  type: string;
  avatarImage: string | null;
  dateOfBirth: number | null;
}

export interface IUpdatePetResponseDto {
  id: string;
  name: string;
  type: string;
  avatarImage: string | null;
  dateOfBirth: string | null;
}

export interface IFetchPetsRequestDto {
  pets: IFindPetResponseDto[];
}

export interface IFindPetResponseDto {
  id: string;
  name: string;
  type: string;
  avatarImage: string | null;
  created: number;
  dateOfBirth: number | null;
}

export interface IDeletePetRequestDto {
  id: string;
}
