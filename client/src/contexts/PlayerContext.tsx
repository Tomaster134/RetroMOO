import { createContext, useState } from "react";

interface IPlayerContext {
    player: IPlayer
    setPlayer: React.Dispatch<React.SetStateAction<IPlayer>>
}

interface IPlayer {
    id: number,
    user_id: number,
    player_name: string,
    is_active: boolean
}

export const PlayerContext = createContext<IPlayerContext>({} as IPlayerContext)

export default function PlayerContextProvider ({children}: {children: React.ReactNode}) {

    const [player, setPlayer] = useState<IPlayer>({
        id: -1,
        user_id: -1,
        player_name: '',
        is_active: false
    })

    const values = {
        player,
        setPlayer
    }

    return (
        <PlayerContext.Provider value={values}>
            {children}
        </PlayerContext.Provider>
    )
}