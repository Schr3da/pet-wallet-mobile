import type {PetDtos} from "../dto";

import {postRequest} from "../common";
import {IPetDto} from "../../dto/pets";
import {IFetchPetsRequestDto} from "../dto/pet";
import {ICombinedReducerState} from "../../store/reducers";
import {base64ImageString} from "../../components/common/utils";

const mapNewPetToDto = (state: ICombinedReducerState): IPetDto => {
  const {mainViewComponent, subViewComponent} = state.navigation;
  const {name, dateOfBirth, animal} = state.inputs[mainViewComponent][
    subViewComponent
  ];
  const {id, profile} = state.newPet;

  return {
    id,
    name: String(name),
    animal: String(animal),
    dateOfBirth: (dateOfBirth as Date) || null,
    profileImage: base64ImageString(profile) || undefined,
    profileUri: profile == null ? undefined : profile.uri,
  };
};

const newCreatePetRequest = (
  state: ICombinedReducerState,
): PetDtos.ICreatePetRequestDto => {
  const {name, dateOfBirth, animal, profileImage} = mapNewPetToDto(state);

  return {
    name: name,
    dateOfBirth: dateOfBirth == null ? null : dateOfBirth.getTime(),
    type: animal,
    avatarImage: profileImage || null,
  };
};

export const createNewPet = async (
  state: ICombinedReducerState,
  token: string,
): Promise<IPetDto | null> => {
  const url = "/api/petpass/pet/create";

  const request = newCreatePetRequest(state);

  try {
    const response = await postRequest<
      PetDtos.ICreatePetRequestDto,
      PetDtos.ICreatePetResponseDto
    >(url, request, token);

    if (response == null) {
      return Promise.resolve(null);
    }

    return Promise.resolve({
      id: response.id,
      animal: response.type,
      name: response.name,
      dateOfBirth:
        response.dateOfBirth == null ? null : new Date(response.dateOfBirth),
      profileImage: response.avatarImage || request.avatarImage || undefined,
      profileUri: undefined,
    });
  } catch (error) {
    return Promise.resolve(null);
  }
};

const newUpdatePetRequest = (
  state: ICombinedReducerState,
): PetDtos.IUpdatePetRequestDto => ({
  ...newCreatePetRequest(state),
  id: String(state.newPet.id),
});

export const updateNewPet = async (
  state: ICombinedReducerState,
  token: string,
) => {
  const url = "/api/petpass/pet/update";

  const request = newUpdatePetRequest(state);

  try {
    const response = await postRequest<
      PetDtos.IUpdatePetRequestDto,
      PetDtos.IUpdatePetResponseDto
    >(url, request, token);
    return Promise.resolve({
      id: response.id || request.id,
      animal: response.type || request.type,
      name: response.name || request.name,
      dateOfBirth:
        response.dateOfBirth == null ? null : new Date(response.dateOfBirth),
      profileImage: response.avatarImage || request.avatarImage || undefined,
      profileUri: undefined,
    });
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

export const updatePet = async (id: string, state: ICombinedReducerState) => {
  const url = "/api/petpass/pet/update";

  const {token} = state.database;
  if (token == null) {
    return false;
  }

  const request = updatePetRequest(id, state);

  try {
    const response = await postRequest<
      PetDtos.IUpdatePetRequestDto,
      PetDtos.IUpdatePetResponseDto
    >(url, request, token);

    return Promise.resolve({
      id: response.id || request.id,
      animal: response.type || request.type,
      name: response.name || request.name,
      dateOfBirth:
        response.dateOfBirth == null ? null : new Date(response.dateOfBirth),
      profileImage: response.avatarImage || request.avatarImage || undefined,
      profileUri: undefined,
    });
  } catch (error) {
    return Promise.resolve(null);
  }
};

const updatePetRequest = (
  id: string,
  state: ICombinedReducerState,
): PetDtos.IUpdatePetRequestDto => {
  const {name, dateOfBirth, animal, profileImage} = mapUpdatePetToDto(
    id,
    state,
  );

  return {
    id,
    name: name,
    dateOfBirth: dateOfBirth == null ? null : dateOfBirth.getTime(),
    type: animal,
    avatarImage: profileImage || null,
  };
};

const mapUpdatePetToDto = (
  id: string,
  state: ICombinedReducerState,
): IPetDto => {
  const {mainViewComponent, subViewComponent} = state.navigation;
  const {name, dateOfBirth, animal} = state.inputs[mainViewComponent][
    subViewComponent
  ];

  const {newProfile} = state.petDetails;

  return {
    id,
    name: String(name),
    animal: String(animal),
    dateOfBirth: (dateOfBirth as Date) || null,
    profileImage: base64ImageString(newProfile) || undefined,
    profileUri: newProfile == null ? undefined : newProfile.uri,
  };
};
