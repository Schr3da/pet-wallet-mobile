import {baseUrl, postRequest} from "../common";
import {ShareDtos} from "../dto";

export const requestShareUrl = async (
  id: string,
  token: string,
): Promise<string | null> => {
  const url = "/api/petpass/share/create";

  const response = await postRequest<
    ShareDtos.ICreateShareRequestDto,
    ShareDtos.ICreateShareResponseDto
  >(url, {petId: id}, token);

  if (response == null) {
    return null;
  }

  const shareToken = response.shareTokenId;
  return baseUrl + "/" + shareToken + "/" + id;
};
