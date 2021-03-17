import {LanguageTypes} from "../../language";

export interface IScanPrefillDto {
  id: string;
  shortInfo: string;
  longInfo: string;
  url: string;
  language: LanguageTypes;
}

export interface IScanDataDto {
  prefills: IScanPrefillDto[];
}
