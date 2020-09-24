export type Roles = 'SUBSCRIPTOR' | 'ADMIN';

export interface Login {
    id?: number,
    username?: string,
    password?: string,
    token?: string
}

export interface LoginResponse {
    username?: string,
    password?: string,
}

export interface UserResponse {
    message: string;
    token: string;
    userId: number;
    role: Roles;
}
