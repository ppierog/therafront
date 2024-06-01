import { UserSession, User, LoginCreds, Patient, Note, Manifest, Id } from "./ApiTypes"

const apiAddress = 'http://localhost:8080'

type HttpMethodType = "DELETE" | "POST" | "GET" | "PUT"

type UrlUser = `/users/${number}`
type UrlPatient = `/patients/${number}`

type UrlEndpoint = "/login" | "/users" | "/patients" | "/notes" | "/manifests" | UrlUser | UrlPatient

class RestRequest {
    request: RequestInit

    constructor(methodType: HttpMethodType, session?: UserSession) {
        this.request = {
            method: methodType,
            headers: {
                'Token': session ? session.token : "",
                'Origin': 'localhost'
            }
        }
        return this
    }

    withBody<BODY>(body: BODY) {
        this.request = { ...this.request, body: JSON.stringify(body) }
        return this
    }
    get() {
        return this.request
    }

}

export async function actionObject<RESPONSE>(req: RequestInit, url: string,
    parser: (response: Response) => Promise<RESPONSE>): Promise<RESPONSE> {

    try {
        const response = await fetch(apiAddress + url, req)

        if (!response.ok) {
            throw new Error('Network response was not ok')
        }

        return parser(response)

    } catch (err) {
        console.log(err)
        return Promise.reject()
    }

}

export async function postObject<REQUEST, RESPONSE>(object: REQUEST, url: UrlEndpoint, session?: UserSession): Promise<RESPONSE> {

    const req = new RestRequest("POST", session).withBody(object)
    return actionObject(req.get(), url, async (response: Response) => {
        const data: RESPONSE = await response.json()
        const stringified = JSON.stringify(data)
        return JSON.parse(stringified)
    }
    )

}

export async function postObjectVoid<REQUEST>(object: REQUEST, url: UrlEndpoint, session?: UserSession): Promise<void> {

    const req = new RestRequest("POST", session).withBody(object)
    return actionObject(req.get(), url, async (_: Response) => { return })

}

export async function putObjectVoid<REQUEST>(object: REQUEST, url: UrlEndpoint, session: UserSession): Promise<void> {

    const req = new RestRequest("PUT", session).withBody(object)
    return actionObject(req.get(), url, async (_: Response) => { return })
}


export async function getObjects<Type>(session: UserSession, url: UrlEndpoint): Promise<Type[]> {
    const req = new RestRequest("GET", session)
    return actionObject(req.get(), url, async (response: Response) => {
        const data = await response.json();
        const stringified = JSON.stringify(data)
        return JSON.parse(stringified)
    }
    )

}

export async function deleteObject(url: UrlEndpoint, objectId: Number, session: UserSession): Promise<void> {

    const req = new RestRequest("DELETE", session)

    return actionObject(req.get(), `${url}/${objectId.toString()}`, async (response: Response) => {
        const data = await response.text();
        return
    })

}

export async function apiLogin(login: LoginCreds): Promise<UserSession> {
    return postObject<LoginCreds, UserSession>(login, "/login")
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

export async function postUser(user: User, session: UserSession): Promise<Id> {
    return postObject(user, "/users", session)
}

export async function postPatient(patient: Patient, session: UserSession): Promise<Id> {
    return postObject(patient, "/patients", session)
}

export async function postNote(note: Note, session: UserSession): Promise<Id> {
    return postObject(note, "/notes", session)
}

export async function puttNote(note: Note, session: UserSession): Promise<void> {
    return putObjectVoid(note, "/notes", session)
}

export async function putUser(user: User, session: UserSession): Promise<void> {
    const url: UrlUser = `/users/${user.id}`
    return putObjectVoid(user, url, session)
}

export async function putPatient(patient: Patient, session: UserSession): Promise<void> {
    const url: UrlPatient = `/patients/${patient.id}`
    return putObjectVoid(patient, url, session)
}

export async function deleteUser(userId: Number, session: UserSession): Promise<void> {

    return deleteObject("/users", userId, session)
}
export async function deletePatient(patientId: Number, session: UserSession): Promise<void> {
    return deleteObject("/patients", patientId, session)
}

export async function deleteNote(noteId: Number, session: UserSession): Promise<void> {
    return deleteObject("/notes", noteId, session)
}