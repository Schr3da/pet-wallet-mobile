import {LanguageTypes} from "../../language";
import {IImageDataDto} from "../image";

export interface IScanResult {
  id: string;
  image: IImageDataDto;
  data: IScanDataDto;
}

export interface IScanEntityDto {
  id: string;
  shortInfo: string;
  longInfo: string;
  url: string;
  language: LanguageTypes;
  isSelected: boolean;
}

export interface IScanDataPrefillsDto {
  [LanguageTypes.de]: IScanEntityDto[];
  [LanguageTypes.en]: IScanEntityDto[];
}

export interface IScanDataSuggestionsDto {
  [LanguageTypes.de]: IScanEntityDto[];
  [LanguageTypes.en]: IScanEntityDto[];
}

export interface IScanDataDto {
  prefills: IScanDataPrefillsDto;
  suggestions: IScanDataSuggestionsDto;
}
