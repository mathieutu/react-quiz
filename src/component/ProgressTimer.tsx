import React, {useEffect, useState} from 'react';
import ProgressBar from "./ProgressBar";
import {QCM_TIME} from "../Data";
import {useSession} from "../context/SessionContext";

type Props = {
    checkTimer(timer: number): void
};

export default function ProgressTimer({ checkTimer }: Props){
    const session = useSession();
    const [currentTimer, setCurrentTimer] = useState<number>(session.state.formTimer ? session.state.formTimer : 0);

    useEffect(() => {
        const timeInterval = setInterval(()=>{
            setCurrentTimer((prevTimerState) => {
                if( (prevTimerState + 1) <= QCM_TIME ){
                    session.update(( prevState => { return {...prevState, formTimer: (prevTimerState + 1)} }));
                    return prevTimerState + 1;
                }
                clearInterval(timeInterval);
                return prevTimerState;
            });
        },1000);

        return () => { clearInterval(timeInterval); }
    },[session]);

    useEffect(() => {
        checkTimer(currentTimer);
    },[currentTimer, checkTimer]);

    return (
        <ProgressBar max={ QCM_TIME } currentValue={ currentTimer }/>
    );
}