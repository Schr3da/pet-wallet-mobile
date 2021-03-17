import {baseUrl} from "../common";

export const requestShareUrl = async (id: string): Promise<string> => {
  const shareToken = "0000-0000-0000-0000";
  return baseUrl + "/" + shareToken + "/" + id;
};
