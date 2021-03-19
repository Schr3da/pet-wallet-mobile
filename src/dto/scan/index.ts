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
