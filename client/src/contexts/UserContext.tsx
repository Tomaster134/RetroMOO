import { createContext, useState } from "react";

interface IUserContext {
    user: IUser
    setUser: React.Dispatch<React.SetStateAction<IUser>>
}

interface IUser {
    id: number,
    username: string,
    email: string,
    active_account: number
}

export const UserContext = createContext<IUserContext>({} as IUserContext)

export default function UserContextProvider ({children}: {children: React.ReactNode}) {

    const [user, setUser] = useState<IUser>({
        id: -1,
        username: '',
        email: '',
        active_account: -1,
    })

    const values = {
        user,
        setUser
    }

    return (
        <UserContext.Provider value={values}>
            {children}
        </UserContext.Provider>
    )
}