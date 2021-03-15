export interface IRemovePetRequestDto {
  id: string;
}

export interface ICreatePetRequestDto {
  name: string;
  type: string;
  dateOfBirth: Date | null;
  avatarImage: string | null;
}

export interface ICreatePetResponseDto {
  id: string;
  name: string;
  type: string;
  avatarImage: string | null;
  created: Date;
  dateOfBirth: Date | null;
}

export interface IUpdatePetRequestDto {
  id: string;
  name: string;
  type: string;
  avatarImage: string | null;
  dateOfBirth: Date | null;
}

export interface IUpdatePetResponseDto {
  id: string;
  name: string;
  type: string;
  avatarImage: string | null;
  dateOfBirth: string | null;
}
