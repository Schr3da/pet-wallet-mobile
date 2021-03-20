import type {PetDtos} from "../dto";

import {postRequest} from "../common";
import {IPetDto} from "../../dto/pets";
import {IFetchPetsRequestDto} from "../dto/pet";

export const createNewPet = async (
  {name, animal, dateOfBirth, profileImage}: IPetDto,
  token: string,
): Promise<IPetDto | null> => {
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

    if (response == null) {
      return Promise.resolve(null);
    }

    return Promise.resolve({
      id: response.id,
      animal: response.type,
      name: response.name,
      dateOfBirth:
        response.dateOfBirth == null ? null : new Date(response.dateOfBirth),
      profileImage: response.avatarImage || undefined,
      profileUri: undefined,
    });
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

export const fetchPets = async (token: string): Promise<IPetDto[]> => {
  const url = "/api/petpass/pet/find";
  try {
    const response = await postRequest<{}, PetDtos.IFetchPetsRequestDto>(
      url,
      {},
      token,
    );

    const data = mapFetchedPets(response);
    return Promise.resolve(data);
  } catch (error) {
    return Promise.resolve([]);
  }
};

const mapFetchedPets = (response: IFetchPetsRequestDto | null): IPetDto[] => {
  if (response == null) {
    return [];
  }

  return (response.pets || [])
    .map((data) => {
      if (data == null) {
        return null;
      }

      return {
        id: data.id,
        name: data.name,
        dateOfBirth:
          data.dateOfBirth == null ? null : new Date(data.dateOfBirth),
        profileImage: data.avatarImage || undefined,
        profileUri: undefined,
        animal: data.type,
      };
    })
    .filter((p) => p != null) as IPetDto[];
};



