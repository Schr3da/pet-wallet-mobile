import type * as CommunicationDtos from "../dto";

import {postRequest} from "../common";
import {IPetDto} from "../../dto/pets";

type BackendPetDto = CommunicationDtos.PetDtos.IPetDto;

export const saveNewPet = async (
  {name, animal, profileImage, dateOfBirth, age}: IPetDto,
  token: string,
) => {
  const url = "/api/petpass/pet/create";

  const mappedData: BackendPetDto = {
    name,
    age,
    dateOfBirth,
    type: animal,
    avatarImage: profileImage || null,
  };

  try {
    const response = await postRequest<BackendPetDto, BackendPetDto>(
      url,
      mappedData,
      token,
    );
    console.log("successful");
    return response;
  } catch (error) {
    return Promise.resolve(null);
  }
};
