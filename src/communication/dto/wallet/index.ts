import {UUID} from "../uuid";

export interface IPetWalletEntry {
  id: UUID;
  petId: UUID;
  title: string; 
  category: string | null;
  description: string | null;
  date: Date;
}

export interface IPetWalletScan {
  id: UUID;
  petId: UUID;
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
