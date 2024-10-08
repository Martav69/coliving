export interface UserJWTHttp {

firstname: string
lastname : string
username: string // email 
roles: string[]
iat: number
exp : number


}

export interface UserJWT {

firstname: string 
lastname : string
username: string
roles: string[]

}

export namespace UserJWT { 

    export function fromHttp(UserJWTHttp: UserJWTHttp): UserJWT{
        return {
            firstname: UserJWTHttp.firstname,
            lastname: UserJWTHttp.lastname,
            username: UserJWTHttp.username,
            roles: UserJWTHttp.roles
        }
    }

}

