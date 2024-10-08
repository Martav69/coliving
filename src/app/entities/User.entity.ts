export interface UserJWTHttp {

id : number
firstname: string
lastname : string
username: string // email 
roles: string[]
iat: number
exp : number


}

export interface UserJWT {

id : number
firstname: string 
lastname : string
username: string
roles: string[]

}

export namespace UserJWT { 

    export function fromHttp(UserJWTHttp: UserJWTHttp): UserJWT{
        return {
            id: UserJWTHttp.id,
            firstname: UserJWTHttp.firstname,
            lastname: UserJWTHttp.lastname,
            username: UserJWTHttp.username,
            roles: UserJWTHttp.roles
        }
    }

}

export interface UserHttp {

    id: number
    email: string
    roles : string[]
    lastname : string
    firstname : string 
    birthdate : string
    adress: string 
    postalcode : string
    city: string 
    country: string 

    // spaces?: Space[]
    // image?: string[]

}

export interface User {

    id: number
    email: string
    roles: string[]
    firstname:string
    lastname: string
    birthdate: string 
    adress: string 
    city: string 
    country: string
    postalcode:string

    // spaces?: Space[]
    // image?: string[]

}

export namespace User {
    export function fromHttp(userHttp: UserHttp): User{

        const user = {

            id: userHttp.id,
            email: userHttp.email,
            roles: userHttp.roles,
            lastname: userHttp.lastname,
            firstname: userHttp.firstname,
            birthdate: userHttp.birthdate,
            adress : userHttp.adress,
            city: userHttp.city,
            country: userHttp.country,
            postalcode: userHttp.postalcode

        }

        // if(userHttp.spaces){
        //     user.spaces = userHttp.spaces.map(space=> space.fromHttp(space))
        // }
        return user

    }
}
