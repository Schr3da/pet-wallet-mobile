import type {PetDtos} from "../dto";

import {postRequest} from "../common";
import {IPetDto} from "../../dto/pets";

export const createNewPet = async (
  {name, animal, dateOfBirth, profileImage}: IPetDto,
  token: string,
) => {
  const url = "/api/petpass/pet/create";

  const mappedData: PetDtos.ICreatePetRequestDto = {
    name,
    dateOfBirth: dateOfBirth == null ? null : dateOfBirth.getTime(),
    type: animal,
    avatarImage: profileImage || null,
  };

  try {
    const response = await postRequest<
      PetDtos.ICreatePetRequestDto,
      PetDtos.ICreatePetResponseDto
    >(url, mappedData, token);
    return Promise.resolve(response);
  } catch (error) {
    return Promise.resolve(null);
  }
};

export const updateNewPet = async (
  {id, name, animal, dateOfBirth, profileImage}: IPetDto,
  token: string,
) => {
  const url = "/api/petpass/pet/update";

  const mappedData: PetDtos.IUpdatePetRequestDto = {
    id: id!,
    name,
    dateOfBirth: dateOfBirth == null ? null : dateOfBirth.getTime(),
    type: animal,
    avatarImage: profileImage || null,
  };

  try {
    const response = await postRequest<
      PetDtos.IUpdatePetRequestDto,
      PetDtos.IUpdatePetResponseDto
    >(url, mappedData, token);
    return Promise.resolve(response);
  } catch (error) {
    return Promise.resolve(null);
  }
};

export const deletePet = async (id: string, token: string) => {
  const url = "/api/petpass/pet/delete";
  try {
    await postRequest<PetDtos.IDeletePetRequestDto, any>(url, {id}, token);
    return Promise.resolve();
  } catch (error) {
    return Promise.resolve(null);
  }
};

export const fetchPets = async (
  token: string,
): Promise<PetDtos.IFetchPetsRequestDto | null> => {
  const url = "/api/petpass/pet/find";
  try {
    const response = await postRequest<{}, PetDtos.IFetchPetsRequestDto>(
      url,
      {},
      token,
    );
    return Promise.resolve(response);
  } catch (error) {
    return Promise.resolve(null);
  }
};

export const scanPassPage = async (base64Image: string, token: string) => {
  const url = "/api/petpass/pet/create";

  try {
    const response = await postRequest<any, any>(url, {}, token);
    return Promise.resolve(response);
  } catch (error) {
    return Promise.resolve(null);
  }
};
