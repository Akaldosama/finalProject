export interface ILoginPayload{
    id?: string,
    username: string,
    password: string,
}

export interface IAuthPromise {
    message: string,
    admin: ILoginPayload,
    tokens: {access_token: string, refresh_token: string}
}