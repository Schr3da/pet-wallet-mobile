import {UserDtos} from "../dto";
import {postRequest} from "../common";

export const register = async () => {
  const url = "/api/petpass/user/create";
  const nickname = "sample_name";

  try {
    const response = await postRequest<
      UserDtos.IUserRequestDto,
      UserDtos.IUserResponseDto
    >(url, {nickname});

    return response;
  } catch (error: any) {
    return Promise.resolve(null);
  }
};
