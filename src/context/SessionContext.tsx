import React, {useContext, useEffect, useState} from "react";
import {User} from "../type/User";
import {FORM_STATE} from "../page/FormPage";

interface SessionStateType {
    user: User | null,
    formStep: number,
    formState: number,
    formTimer: number
}

interface SessionValue{
    state: SessionStateType,
    update(value: SessionStateType): void,
    logout(): void
}

const sessionStateDefaultValues: SessionStateType = {
    user: null,
    formStep: 0,
    formTimer: 0,
    formState: FORM_STATE.NOT_STARTED,
};

export const sessionContext = React.createContext<SessionValue | undefined>(undefined);

export const useSession = () => {
    const context = useContext(sessionContext);
    if(context === undefined){
        throw new Error("Le contexte doit être défini");
    }
    return context;
};

export default function AppSessionProvider(props: any){
    const [sessionState, setSessionState] = useState<SessionStateType>(sessionStateDefaultValues);

    const handleUpdateSession = (value:SessionStateType) => {
        localStorage.setItem('state',JSON.stringify(value));
        setSessionState(value);
    };

    const handleLogout = () => {
        localStorage.clear();
        setSessionState(sessionStateDefaultValues);
    };

    useEffect(() => {
        const storedState = localStorage.getItem('state');
        if(storedState !== null){
            setSessionState(JSON.parse(storedState));
        }
    },[]);

    return (
        <sessionContext.Provider value={{state:sessionState, update: handleUpdateSession, logout:handleLogout}}>
            {props.children}
        </sessionContext.Provider>
    );
}