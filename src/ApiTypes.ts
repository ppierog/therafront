export type UserSession = {
    token: string
    expiresAt: string
}


export type Id = {
    id: Number
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

export type Patient = {
    id: Number,
    name: string,
    occupation: string,
    birthYear: Number,
    city: string,
    telephoneNumber: string
}

export type Note = {
    id: Number,
    name: string,
    patientRowId: Number,
    sessionDate: Number,
    noteDate: Number,
    fileName: String,
    isCrypted: Boolean
}
export type Manifest = {
    id: Number,
    patientId: Number,
    userId: Number,
    crudMask: Number,
    encryptedAes: string
}

export type LoginCreds = {
    email: string,
    password: string,
}