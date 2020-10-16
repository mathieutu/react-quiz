import React, {useContext, useEffect, useState} from "react";
import {User} from "../type/User";
import {FORM_NOT_STARTED} from "../page/FormPage";

interface SessionType {
    user:User|null,
    formStep:number,
    formState:number,
    formTimer:number
}

interface SessionValue extends SessionType{
    updateSession(type:string,value?:any):void
}

const sessionDefaultValues = {
    user: null,
    formStep: 0,
    formTimer: 0,
    formState: FORM_NOT_STARTED,
}

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
            case 'formState':
                handleFormState(value);
                break;
            case 'formTimer':
                handleFormTimer(value);
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

    const handleFormState = (newFormState:number) => {
        if(newFormState !== null){
            setSessionState({...sessionState, formState:newFormState});
            localStorage.setItem('formState',newFormState.toString());
        }
    };

    const handleFormTimer = (newFormTimer: number) => {
        if(newFormTimer !== null){
            setSessionState({...sessionState, formState:newFormTimer});
            localStorage.setItem('formTimer',newFormTimer.toString());
        }
    };

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const storedFormState = localStorage.getItem('formState');
        const storedFormStep = localStorage.getItem('formStep');
        const storedFormTimer = localStorage.getItem('formTimer');
        let newSessionState = sessionState;
        if(storedUser !== null){
            newSessionState = {...newSessionState,user:JSON.parse(storedUser)};
        }
        if(storedFormState !== null){
            newSessionState = {...newSessionState,formState:JSON.parse(storedFormState)};
        }
        if(storedFormStep !== null){
            newSessionState = {...newSessionState,formStep:JSON.parse(storedFormStep)};
        }
        if(storedFormTimer !== null){
            newSessionState = {...newSessionState,formTimer:JSON.parse(storedFormTimer)};
        }
        setSessionState(newSessionState);
    },[]);

    return (
        <sessionContext.Provider value={{...sessionState,updateSession:handleUpdateSession}}>
            {props.children}
        </sessionContext.Provider>
    );
}