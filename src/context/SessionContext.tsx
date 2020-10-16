import React, {useContext, useEffect, useState} from "react";
import {User} from "../type/User";
import {FORM_NOT_STARTED} from "../page/FormPage";

type SessionType = {
    user:User|null,
    formStep:number,
    formState:number
}

type SessionValue = {
    user:User|null,
    formStep:number,
    formState:number,
    updateSession(type:string,value?:any):void
}

const storedUser = localStorage.getItem('user');
const storedFormState = localStorage.getItem('formState');
const storedFormStep = localStorage.getItem('formStep');

console.log(storedUser,storedFormState,storedFormStep);

const sessionDefaultValues = {
    user: null,
    formStep: 0,
    formState: FORM_NOT_STARTED,
}

/*const sessionDefaultValues:SessionType = {
    user: (storedUser !== null ? JSON.parse(storedUser) : null),
    formStep: (storedFormStep !== null ? JSON.parse(storedFormStep) : 0),
    formState: (storedFormState !== null ? JSON.parse(storedFormState) : FORM_NOT_STARTED),
};*/

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

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const storedFormState = localStorage.getItem('formState');
        const storedFormStep = localStorage.getItem('formStep');
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
        setSessionState(newSessionState);
    },[]);

    return (
        <sessionContext.Provider value={{...sessionState,updateSession:handleUpdateSession}}>
            {props.children}
        </sessionContext.Provider>
    );
}