import {UserDtos} from "../dto";
import {postRequest} from "../common";

export const requestToken = async () => {
  const url = "/api/petpass/user/create";
  const nickname = "sample_name";

  try {
    const response = await postRequest<
      UserDtos.ICreateUserRequestDto,
      UserDtos.ICreateUserResponseDto
    >(url, {nickname});
    return response == null ? null : response.token;
  } catch (error) {
    return Promise.resolve(null);
  }
};
