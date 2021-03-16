export interface IPetWalletEntry {
  id: string;
  petId: string;
  title: string;
  category: string | null;
  description: string | null;
  date: Date;
}

export interface IPetWalletScan {
  id: string;
  petId: string;
  imagePath: string;
  created: Date;
  processed: Date | null;
  ocrTokensRaw: string[];
  processResult: IPetWalletScanProcessResult[];
}

export interface IPetWalletScanProcessResult {
  ocrTokenRaw: string;
  knownTokens: string[];
}
