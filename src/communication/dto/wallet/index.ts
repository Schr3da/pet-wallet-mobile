import {UUID} from "../uuid";

export interface IPetWalletEntry {
  id: UUID;
  petId: UUID;
  title: string; // e.g. 'Nobivac'
  category: string | null; // e.g. 'Tollwut Schutzimpfung'
  description: string | null; // e.g. 'Freitextfeld ... Durchgeführt bei Doktor Blabla in Möllersdorf
  date: Date; // Zeitpunkt der Impfung / Behandlung
}

export interface IPetWalletScan {
  id: UUID;
  petId: UUID;
  imagePath: string; // file Path to image
  created: Date; // photo uploaded at time
  processed: Date | null; // photo was last processed at time
  ocrTokensRaw: string[]; // all raw tokens extracted by ocr service of image
  processResult: IPetWalletScanProcessResult[]; // relevant tokens as result of raw tokens - only the fixed and relevant tokens should survive
}

export interface IPetWalletScanProcessResult {
  ocrTokenRaw: string;
  knownTokens: string[]; // known tokens (e.g. medicine names), sorted by probability descending (first hit is the one with the highest probability)
}
