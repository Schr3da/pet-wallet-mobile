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
