export interface IRequest {
    usernameOrEmail: string | null;
    password: string | null;
}

export interface IResponse {
    id: string | null;
    nickname: string | null;
    email: string | null,
    fullName: string | null
}

export interface IAuthState {
    loggedIn: boolean;
    loading: 'idle' | 'pending' | 'succeeded' | 'failed' | 'rejected';
    error: string | null;
    request: IRequest;
    response: IResponse;
}

export interface IUserState {
    email: string
    fullName: string
    nickName: string
    password: string
    confirm: string
}
export interface IRegisterState extends IUserState {
    validationErrors: IUserState;
}