import { UserSession, User, LoginCreds } from "./ApiTypes";


const apiAddress = 'http://localhost:8080'

export async function getUsers(session: UserSession): Promise<User[]> {

    try {

        const response = await fetch(apiAddress + '/users', {
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
