import type {PetDtos} from "../dto";

import {postRequest, stringToDate} from "../common";
import {IPetDto} from "../../dto/pets";

export const removePet = async (
  id: string,
  token: string,
) => {
  const url = "/api/petpass/pet/delete";
  try {
    await postRequest<PetDtos.IRemovePetRequestDto, any>(url, {id}, token);
    return Promise.resolve();
  } catch (error) {
    return Promise.resolve(null);
  }
}

export const scanPassPage = async (
  base64Image: string,
  token: string,
) => {
  const url = "/api/petpass/pet/create";

  try {
    const response = await postRequest<any, any>(
      url, 
      {}, 
      token
    );
    return Promise.resolve(response);
  } catch (error) {
    return Promise.resolve(null);
  }
};

export const createNewPet = async (
  {name, animal, dateOfBirth, profileImage}: IPetDto,
  token: string,
) => {
  const url = "/api/petpass/pet/create";

  const mappedData: PetDtos.ICreatePetRequestDto = {
    name,
    dateOfBirth,
    type: animal,
    avatarImage: profileImage || null,
  };

  try {
    const response = await postRequest<PetDtos.ICreatePetRequestDto, PetDtos.ICreatePetResponseDto>(
      url,
      mappedData,
      token,
    );
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
    dateOfBirth,
    type: animal,
    avatarImage: profileImage || null,
  };

  try {
    const response = await postRequest<PetDtos.IUpdatePetRequestDto, PetDtos.IUpdatePetResponseDto>(
      url,
      mappedData,
      token,
    );
    return Promise.resolve(response);
  } catch (error) {
    return Promise.resolve(null);
  }
};
