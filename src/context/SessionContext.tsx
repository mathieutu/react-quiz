import React, {useEffect, useState} from "react";

type SessionType = {
    user:string|null,
    formStep:number,
    updateFormStep(newFormStep:number):void
    updateUser(newUser:string):void
}

const sessionDefaultValues:SessionType = {
    user: null,
    formStep:0,
    updateFormStep:() => {},
    updateUser:() => {}
};

export const SessionContext = React.createContext(sessionDefaultValues);

export default function ApplicationSession(props:any){
    const [sessionState, setSessionState] = useState<SessionType>(sessionDefaultValues);

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

    useEffect(() => {
        setSessionState((prevState:SessionType)=>{return {...prevState,updateFormStep:handleFormStep,updateUser:handleUser}});
    },[]);

    return (
        <SessionContext.Provider value={sessionState}>
            {props.children}
        </SessionContext.Provider>
    );
}