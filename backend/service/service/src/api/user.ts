export interface CreateUserRequest {
    nickname: string;
}
export interface CreateUserResponse {
    token: string;
    nickname: string;
}

export interface UpdateUserRequest {
    nickname: string;
}
export interface UpdateUserResponse {
    nickname: string;
}

export interface FindUserRequest {
}
export interface FindUserResponse {
    token: string;
    nickname: string;
    created: number;
}

export interface DeleteUserRequest {
}
export interface DeleteUserResponse {
}