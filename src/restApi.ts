import { UserSession, User, LoginCreds, Patient, Note, Manifest } from "./ApiTypes"

const apiAddress = 'http://localhost:8080'

export async function postObject<REQUEST, RESPONSE>(object: REQUEST, url: string, session?: UserSession): Promise<RESPONSE> {

    const requestOptions = {
        method: 'POST',
        headers: {
            'Token': session ? session.token : "",
            'Origin': 'localhost'
        },
        body: JSON.stringify(object)
    }

    try {
        const response = await fetch(apiAddress + url, requestOptions)

        if (!response.ok) {
            throw new Error('Network response was not ok')
        }

        const data: RESPONSE = await response.json()
        const stringified = JSON.stringify(data)
        return JSON.parse(stringified)

    } catch (err) {
        console.log(err)
        return Promise.reject()
    }

}


export async function postObjectVoid<REQUEST>(object: REQUEST, url: string, session?: UserSession): Promise<void> {

    const requestOptions = {
        method: 'POST',
        headers: {
            'Token': session ? session.token : "",
            'Origin': 'localhost'
        },
        body: JSON.stringify(object)
    }

    try {
        const response = await fetch(apiAddress + url, requestOptions)

        if (!response.ok) {
            throw new Error('Network response was not ok')
        }
        return

    } catch (err) {
        console.log(err)
        return Promise.reject()
    }

}



export async function getObjects<Type>(session: UserSession, apiLink: string): Promise<Type[]> {
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


export async function deleteObject(url: string, objectId: Number, session: UserSession): Promise<void> {

    const requestOptions = {

        method: 'DELETE',
        headers: {
            'Token': session.token,
            'Origin': 'localhost'
        },
    }

    try {
        const response = await fetch(apiAddress + url + objectId.toString(), requestOptions)

        if (!response.ok) {
            throw new Error('Network response was not ok')
        }

        await response.text()
        return

    } catch (err) {
        console.log(err)
        return Promise.reject()
    }

}


export async function getUsers(session: UserSession): Promise<User[]> {
    return getObjects<User>(session, "/users")
}

export async function getPatients(session: UserSession): Promise<Patient[]> {
    return getObjects<Patient>(session, "/patients")
}

export async function getNotes(session: UserSession): Promise<Note[]> {
    return getObjects<Note>(session, "/notes")
}

export async function getManifests(session: UserSession): Promise<Manifest[]> {
    return getObjects<Manifest>(session, "/manifests")
}

export async function apiLogin(login: LoginCreds): Promise<UserSession> {
    return postObject<LoginCreds, UserSession>(login, "/login")
}

export async function postUser(user: User, session: UserSession): Promise<void> {
    return postObjectVoid(user, "/users", session)
}

export async function postPatient(patient: Patient, session: UserSession): Promise<void> {
    return postObjectVoid(patient, "/patients", session)
}

export async function deleteUser(userId: Number, session: UserSession): Promise<void> {
    return deleteObject("/users/", userId, session)
}
export async function deletePatient(patientId: Number, session: UserSession): Promise<void> {
    return deleteObject("/patients/", patientId, session)
}