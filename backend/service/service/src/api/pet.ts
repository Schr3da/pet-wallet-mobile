export interface CreatePetRequest {
    name: string;
    type: string;
    avatarImage: string | null;
    dateOfBirth: number | null;
}
export interface CreatePetResponse {
    id: string;
    name: string;
    type: string;
    avatarImage: string | null;
    dateOfBirth: number | null;
}

export interface UpdatePetRequest {
    id: string;
    name: string;
    type: string;
    avatarImage: string | null;
    dateOfBirth: number | null;
}
export interface UpdatePetResponse {
    id: string;
    name: string;
    type: string;
    avatarImage: string | null;
    dateOfBirth: number | null;
}

export interface FindPetRequest {
}
export interface FindPetResponse {
    pets: FindPetResponseEntry[];
}
export interface FindPetResponseEntry {
    id: string;
    name: string;
    type: string;
    avatarImage: string | null;
    created: number;
    dateOfBirth: number | null;
}
export class FindPetResponseBase implements FindPetResponse {
    public pets: FindPetResponseEntry[];

    constructor() {
        this.pets = [];
    }
}

export interface DeletePetRequest {
    id: string
}
export interface DeletePetResponse {
}