import * as Dtos from "../../dto";
import {WalletDtos} from "../dto";

import {postRequest} from "../common";
import {LanguageTypes} from "../../language";

export const requestScan = async (
  id: string,
  base64Image: string,
  token: string,
): Promise<Dtos.Scan.IScanDataDto | null> => {
  const url = "/api/petpass/wallet/process";

  try {
    const response = await postRequest<
      WalletDtos.CreateWalletScanRequestDto,
      WalletDtos.CreateWalletScanResponseDto
    >(
      url,
      {
        petId: id,
        scan: base64Image,
      },
      token,
    );

    const data = mapScanData(response);

    return Promise.resolve(data);
  } catch (error) {
    return Promise.resolve(null);
  }
};

const mapScanData = (
  response: WalletDtos.CreateWalletScanResponseDto,
): Dtos.Scan.IScanDataDto | null => {
  if (response == null) {
    return null;
  }

  return {
    prefills: extractPrefills(response),
  };
};

const extractPrefills = (
  response: WalletDtos.CreateWalletScanResponseDto,
): Dtos.Scan.IScanPrefillDto[] => {
  const raw = response.ocrTokenRaw
    .filter((r) => r != null && r.length > 2)
    .map((r) => r.toLowerCase());

  return (response.suggestions || []).reduce((result, next) => {
    if (next == null) {
      return result;
    }

    const match = findPotentialPrefill(next, raw);
    if (match == null) {
      return result;
    }

    const isDublicate = result.find(
      (r) =>
        r.shortInfo === match.shortInfo &&
        r.language === match.language &&
        r.url === match.url,
    );

    if (isDublicate) {
      return result;
    }

    return [
      ...result,
      {
        id: next.medicineId,
        shortInfo: match.shortInfo,
        longInfo: match.longInfo,
        url: match.url,
        language: match.language as LanguageTypes,
      },
    ];
  }, [] as Dtos.Scan.IScanPrefillDto[]);
};

const findPotentialPrefill = (
  data: WalletDtos.PetWalletScanResponseResultSuggestionDto,
  validator: string[],
): WalletDtos.PetWalletScanMedicineInfoDto | undefined => {
  if (data == null) {
    return undefined;
  }

  const infos = data.medicineInfos || [];

  return infos.find((info: WalletDtos.PetWalletScanMedicineInfoDto) => {
    if (info == null) {
      return false;
    }

    let split = info.shortInfo
      .toLowerCase()
      .split(" ")
      .filter((s, i) => s.length > 2 && (i == 0 || i === 1 || i === 2));

    let probability = 0;

    for (let i = 0; i < split.length; i++) {
      const current = split[i];

      const index = validator.find(
        (r: string) => current.indexOf(r) !== -1 || r.indexOf(current) !== -1,
      );

      if (index == null) {
        continue;
      }

      probability++;

      if (probability >= 2) {
        return true;
      }
    }

    return false;
  });
};
