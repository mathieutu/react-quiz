import React, {useContext, useState} from "react";

type SessionType = {
    user:string|null,
    formStep:number,
    isFormStarted:boolean
}

type SessionValue = {
    user:string|null,
    formStep:number,
    isFormStarted:boolean,
    updateSession(type:string,value:any):void
}

const sessionDefaultValues:SessionType = {
    user: null,
    formStep:0,
    isFormStarted:false,
};

export const sessionContext = React.createContext<SessionValue|undefined>(undefined);

export const useUser = () => {
    const context = useContext(sessionContext);
    if(context === undefined){
        throw new Error("Le contexte doit être défini");
    }
    return context.user;
}

export const useFormStep = () => {
    const context = useContext(sessionContext);
    if(context === undefined){
        throw new Error("Le contexte doit être défini");
    }
    return context.formStep;
}

export const useIsFormStarted = () => {
    const context = useContext(sessionContext);
    if(context === undefined){
        throw new Error("Le contexte doit être défini");
    }
    return context.isFormStarted;
}

export default function ApplicationSession(props:any){
    const [sessionState, setSessionState] = useState<SessionType>(sessionDefaultValues);

    const handleUpdateSession = (type:string,value:any) => {
        switch(type){
            case 'user':
                handleUser(value);
                break;
            case 'formStep':
                handleFormStep(value);
                break;
            case 'isFormStarted':
                break;
            default:
                break;
        }
    }

    const handleFormStep = (newFormStep:number) => {
        if(newFormStep > sessionState.formStep){
            setSessionState({...sessionState, formStep:newFormStep});
        }
    }

    const handleUser = (newUser:string) => {
        if(newUser !== null){
            setSessionState({...sessionState, user:newUser});
        }
    }

    return (
        <sessionContext.Provider value={{...sessionState,updateSession:handleUpdateSession}}>
            {props.children}
        </sessionContext.Provider>
    );
}