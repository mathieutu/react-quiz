import React, {useContext, useEffect, useState} from "react";
import {User} from "../type/User";

type SessionType = {
    user:User|null,
    formStep:number,
    isFormStarted:boolean
}

type SessionValue = {
    user:User|null,
    formStep:number,
    isFormStarted:boolean,
    updateSession(type:string,value?:any):void
}

const sessionDefaultValues:SessionType = {
    user: null,
    formStep:0,
    isFormStarted:false,
};

export const sessionContext = React.createContext<SessionValue|undefined>(undefined);

export const useSession = () => {
    const context = useContext(sessionContext);
    if(context === undefined){
        throw new Error("Le contexte doit être défini");
    }
    return context;
};

export default function ApplicationSession(props:any){
    const [sessionState, setSessionState] = useState<SessionType>(sessionDefaultValues);

    const handleUpdateSession = (type:string,value?:any) => {
        switch(type){
            case 'user':
                handleUser(value);
                break;
            case 'formStep':
                handleFormStep(value);
                break;
            case 'isFormStarted':
                handleIsFormStarted(value);
                break;
            case 'logout':
                logout();
                break;
            default:
                break;
        }
    };

    const logout = () => {
        localStorage.clear();
        setSessionState(sessionDefaultValues);
    };

    const handleFormStep = (newFormStep:number) => {
        if(newFormStep > sessionState.formStep){
            setSessionState({...sessionState, formStep:newFormStep});
            localStorage.setItem('formStep',newFormStep.toString());
        }
    };

    const handleUser = (newUser:User) => {
        if(newUser !== null){
            setSessionState({...sessionState, user:newUser});
            localStorage.setItem('user',JSON.stringify(newUser));
        }
    };

    const handleIsFormStarted = (newIsStarted:boolean) => {
        if(newIsStarted !== null){
            setSessionState({...sessionState, isFormStarted:newIsStarted});
            localStorage.setItem('isFormStarted',(newIsStarted ? 'true' : 'false'));
        }
    };

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const storedIsFormStarted = localStorage.getItem('isFormStarted');
        const storedFormStep = localStorage.getItem('formStep');
        let newSessionState = sessionState;
        if(storedUser !== null){
            newSessionState = {...newSessionState,user:JSON.parse(storedUser)};
        }
        if(storedIsFormStarted !== null){
            newSessionState = {...newSessionState,isFormStarted:JSON.parse(storedIsFormStarted)};
        }
        if(storedFormStep !== null){
            newSessionState = {...newSessionState,formStep:JSON.parse(storedFormStep)};
        }
        setSessionState(newSessionState);
    },[]);

    return (
        <sessionContext.Provider value={{...sessionState,updateSession:handleUpdateSession}}>
            {props.children}
        </sessionContext.Provider>
    );
}