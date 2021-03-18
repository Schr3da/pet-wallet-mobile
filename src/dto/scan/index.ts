import {LanguageTypes} from "../../language";

export interface IScanEntityDto {
  id: string;
  shortInfo: string;
  longInfo: string;
  url: string;
  language: LanguageTypes;
  isSelected: boolean;
}

export interface IScanDataDto {
  prefills: {
    [LanguageTypes.de]: IScanEntityDto[];
    [LanguageTypes.en]: IScanEntityDto[];
  };
  suggestions: {
    [LanguageTypes.de]: IScanEntityDto[];
    [LanguageTypes.en]: IScanEntityDto[];
  };
}
