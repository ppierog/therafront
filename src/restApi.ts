import { UserSession, User, LoginCreds, Patient, Note, Manifest } from "./ApiTypes"

const apiAddress = 'http://localhost:8080'

export async function apiLogin(login: LoginCreds): Promise<UserSession> {

    const requestOptions = {

        method: 'POST',
        body: JSON.stringify({ email: login.email, password: login.password })
    };

    try {
        const response = await fetch(apiAddress + '/login', requestOptions)

        if (!response.ok) {
            throw new Error('Network response was not ok')
        }

        const data = await response.json()
        const stringified = JSON.stringify(data)
        return JSON.parse(stringified)

    } catch (err) {
        console.log(err)
        return Promise.reject()
    }

}

export async function getObjects<Type>(session: UserSession, apiLink: string) : Promise<Type[]>
{
    try {

        const response = await fetch(apiAddress + apiLink, {
            method: 'GET',
            headers: {
                'Token': session.token,
                'Origin': 'localhost'
            }
        })

        if (!response.ok) {
            throw new Error('Network response was not ok')
        }

        const data = await response.json();
        const stringified = JSON.stringify(data)
        return JSON.parse(stringified)

    } catch (error) {
        console.log(error)
    }
    return []
}

export async function getUsers(session: UserSession): Promise<User[]> {
    return getObjects<User>(session, "/users")
}

export async function getPatients(session: UserSession): Promise<Patient[]> {
    return getObjects<Patient>(session, "/patients")
}

export async function getNotes(session : UserSession) : Promise<Note[]> {
    return getObjects<Note>(session, "/notes")
}

export async function getManifests(session : UserSession) : Promise<Manifest[]> {
    return getObjects<Manifest>(session, "/manifests")
}