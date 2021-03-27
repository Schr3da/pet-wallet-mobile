import * as Dtos from "../../dto";
import {WalletDtos} from "../dto";

import {postRequest} from "../common";
import {LanguageTypes} from "../../language";
import {IScanEntityDto} from "../../dto/scan";
import {PetWalletScanMedicineInfoDto} from "../dto/wallet";

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

  const prefills = extractPrefills(response);
  const suggestions = extractSuggestions(response);

  return {
    prefills: {
      [LanguageTypes.de]: filterByLanguage(LanguageTypes.de, prefills),
      [LanguageTypes.en]: filterByLanguage(LanguageTypes.en, prefills),
    },
    suggestions: {
      [LanguageTypes.de]: filterByLanguage(LanguageTypes.de, suggestions),
      [LanguageTypes.en]: filterByLanguage(LanguageTypes.en, suggestions),
    },
  };
};

const isDublicate = (
  data: PetWalletScanMedicineInfoDto,
  collection: IScanEntityDto[],
) =>
  (collection || []).find(
    (r) =>
      r.shortInfo === data.shortInfo &&
      r.language === data.language &&
      r.url === data.url,
  ) != null;

const filterByLanguage = (language: LanguageTypes, data: IScanEntityDto[]) =>
  (data || []).filter((d) => d.language === language);

const extractPrefills = (
  response: WalletDtos.CreateWalletScanResponseDto,
): Dtos.Scan.IScanEntityDto[] => {
  const raw = response.ocrTokenRaw
    .filter((r) => r != null && r.length > 2)
    .map((r) => r.toLowerCase());

  return (response.suggestions || []).reduce((result, next) => {
    if (next == null) {
      return result;
    }

    const matchDE = findPotentialPrefill(next, raw, LanguageTypes.de);
    if (matchDE != null && isDublicate(matchDE, result) === false) {
      result.push({
        id: next.medicineId,
        shortInfo: matchDE.shortInfo,
        longInfo: matchDE.longInfo,
        url: matchDE.url,
        language: matchDE.language as LanguageTypes,
        isSelected: true,
      });
    }

    const matchEN = findPotentialPrefill(next, raw, LanguageTypes.en);
    if (matchEN != null && isDublicate(matchEN, result) === false) {
      result.push({
        id: next.medicineId,
        shortInfo: matchEN.shortInfo,
        longInfo: matchEN.longInfo,
        url: matchEN.url,
        language: matchEN.language as LanguageTypes,
        isSelected: true,
      });
    }

    return result;
  }, [] as Dtos.Scan.IScanEntityDto[]);
};

const findPotentialPrefill = (
  data: WalletDtos.PetWalletScanResponseResultSuggestionDto,
  validator: string[],
  language: LanguageTypes,
): WalletDtos.PetWalletScanMedicineInfoDto | undefined => {
  if (data == null) {
    return undefined;
  }

  const infos = data.medicineInfos || [];

  return infos.find((info: WalletDtos.PetWalletScanMedicineInfoDto) => {
    if (info == null || info.language !== language) {
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

const extractSuggestions = (
  response: WalletDtos.CreateWalletScanResponseDto,
): Dtos.Scan.IScanEntityDto[] => {
  return (response.suggestions || []).reduce((result, next) => {
    if (next == null) {
      return result;
    }

    const infos = getInfos(next.medicineId, next.medicineInfos);

    const infosToAdd = infos.filter(
      (info) =>
        result.find(
          (r) =>
            r.shortInfo === info.shortInfo &&
            r.language === info.language &&
            r.url === info.url,
        ) == null,
    );

    return [...result, ...infosToAdd];
  }, [] as IScanEntityDto[]);
};

const getInfos = (
  id: string,
  infos: WalletDtos.PetWalletScanMedicineInfoDto[],
) =>
  (infos || []).reduce((result, next) => {
    if (next == null) {
      return result;
    }

    const isDublicate = result.find(
      (r) =>
        r.shortInfo === next.shortInfo &&
        r.language === next.language &&
        r.url === next.url,
    );

    if (isDublicate) {
      return result;
    }

    return [
      ...result,
      {
        id,
        isSelected: false,
        shortInfo: next.shortInfo,
        longInfo: next.longInfo,
        url: next.url,
        language: next.language as LanguageTypes,
      },
    ];
  }, [] as IScanEntityDto[]);

export const deleteWallet = async (token: string): Promise<boolean> => {
  const url = "/api/petpass/user/delete";

  try {
    await postRequest<{}, {}>(url, {}, token);
    return true;
  } catch {
    return false;
  }
};
