export interface CreateWalletEntryRequest {
    petId: string;
    medicineId: string | undefined;
    title: string;
    description: string | null;
    date: number;
}
export interface CreateWalletEntryResponse {
    id: string;
    petId: string;
    medicineId: string | null;
    title: string;
    description: string | null;
    date: number;
}

export interface UpdateWalletEntryRequest {
    id: string;
    petId: string;
    medicineId: string | undefined;
    title: string;
    description: string | null;
    date: number;
}
export interface UpdateWalletEntryResponse {
    petId: string;
    medicineId: string | null;
    title: string;
    description: string | null;
    date: number;
}

export interface DeleteWalletEntryRequest {
    id: string;
}
export interface DeleteWalletEntryResponse {
}

export interface FindWalletEntriesRequest {
    petId: string;
}
export interface FindWalletEntriesResponse {
    entries: FindWalletEntriesResponseEntry[];
}
export interface FindWalletEntriesResponseEntry {
    id: string;
    medicineId: string | null;
    title: string;
    description: string | null;
    date: number;
}

export interface CreateWalletScanRequest {
    petId: string;
    scan: string;
}
export interface CreateWalletScanResponse {
    id: string;
    ocrTokenRaw: string[];
    suggestions: PetWalletScanResponseResultSuggestion[];
}
export interface PetWalletScanResponseResultSuggestion {
    searchTerm: string;
    knownToken: string;
    medicineId: string;
    medicineInfos: PetWalletScanMedicineInfo[];
}
export interface PetWalletScanMedicineInfo {
    shortInfo: string;
	longInfo: string;
	language: string;
	url: string;
}
export interface DeleteWalletScanRequest {
    id: string;
}
export interface DeleteWalletScanResponse {
}