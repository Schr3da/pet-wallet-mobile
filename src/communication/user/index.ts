import {UserDtos} from "../dto";
import {postRequest} from "../common";

export const register = async () => {
  const url = "/api/petpass/user/create";
  const nickname = "sample_name";

  try {
    const response = await postRequest<
      UserDtos.ICreateUserRequestDto,
      UserDtos.ICreateUserResponseDto
    >(url, {nickname});
    return response;
  } catch (error) {
    return Promise.resolve(null);
  }
};
