import { FindPetResponseEntry } from './pet';
import { FindWalletEntriesResponseEntry } from './wallet';

export interface CreateShareRequest {
    petId: string;
}
export interface CreateShareResponse {
    shareTokenId: string;
}

export interface DeleteShareRequest {
    shareTokenId: string;
}
export interface DeleteShareResponse {
}

export interface GetSharedDataRequest {
    shareTokenId: string;
}
export interface GetSharedDataResponse {
    pet: FindPetResponseEntry;
    entries: FindWalletEntriesResponseEntry[];
}