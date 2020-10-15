import React, {useEffect, useState} from 'react';
import {QCM} from "../Data";
import DisplayQuestion from "../component/DisplayQuestion";
import {Response} from "../type/Response";
import {useIsFormStarted} from "../context/SessionContext";

export default function FormPage(){
    const [currentQuestionIndex,setCurrentQuestionIndex] = useState<number>(0);
    const isFormStarted = useIsFormStarted();
    useEffect(() => {
        if(isFormStarted){
            alert('form déjà commencé !');
        }
    },[])

    const handleNext = (response:Response) => {
        //TODO : request API send
        console.log(response);
        setCurrentQuestionIndex(currentQuestionIndex + 1);
    };
    return (
        <div className="m-10 w-full">
            <div className="text-right italic text-lg">Question {currentQuestionIndex + 1}/{QCM.length}</div>
            {QCM[currentQuestionIndex] !== undefined ? (
                <DisplayQuestion question={QCM[currentQuestionIndex]} handleNext={handleNext}/>
            ) : ('fini')}
        </div>
    );
}