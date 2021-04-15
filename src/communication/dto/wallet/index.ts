export interface CreateWalletScanRequestDto {
  petId: string;
  scan: string;
}

export interface CreateWalletScanResponseDto {
  id: string;
  ocrTokenRaw: string[];
  suggestions: PetWalletScanResponseResultSuggestionDto[];
}

export interface PetWalletScanResponseResultSuggestionDto {
  knownToken: string;
  medicineId: string;
  medicineInfos: PetWalletScanMedicineInfoDto[];
}

export interface PetWalletScanMedicineInfoDto {
  shortInfo: string;
  longInfo: string;
  language: string;
  url: string;
}

export interface CreateWalletEntryRequestDto {
  petId: string;
  medicineId: string | undefined;
  title: string;
  description: string | null;
  date: number;
}

export interface CreateWalletEntryResponseDto {
  id: string;
  petId: string;
  medicineId: string | null;
  title: string;
  description: string | null;
  date: number;
}

export interface INoteDto {
  title: string;
  body: string;
}

export interface ICreateWalletNotesRequestDto {
  petId: string;
  notes: INoteDto[];
}

export interface IGetWalletNotesRequestDto {
  petId: string;
}

export interface IGetWalletNotesResponseDto {
  data: INoteDto[];
}
