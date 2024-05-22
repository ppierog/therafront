export type UserSession = {
    token: string
    expiresAt: string
}

export type User = {
    email: string,
    id: Number,
    lastName: string,
    name: string,
    password: string,
    pubKey: string,
    salt: string,
    telephoneNumber: string
}

export type LoginCreds = {
    email: string,
    password: string,
}