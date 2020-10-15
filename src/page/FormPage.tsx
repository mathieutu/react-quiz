import React, {useEffect, useState} from 'react';
import {QCM} from "../Data";
import DisplayQuestion from "../component/DisplayQuestion";
import {Response} from "../type/Response";
import {useSession} from "../context/SessionContext";
import EndPage from "./EndPage";
import {RiPushpin2Fill} from "react-icons/all";

export default function FormPage(){
    const [currentQuestionIndex,setCurrentQuestionIndex] = useState<number>(0);
    const session = useSession();

    const handleNext = (response:Response) => {
        //TODO : request API send
        console.log(response);
        session.updateSession('formStep',currentQuestionIndex + 1);
        setCurrentQuestionIndex(currentQuestionIndex + 1);
    };

    useEffect(() => {
        if(session.formStep !== undefined){
            setCurrentQuestionIndex(session.formStep);
        }
    },[]);
    return (
        <div className="m-10 w-full">
            {QCM[currentQuestionIndex] !== undefined ? (
                <>
                    <div className="text-right italic text-lg flex justify-end">
                        <div className='my-auto'>Question {currentQuestionIndex + 1}/{QCM.length}</div>
                        <RiPushpin2Fill className="my-auto ml-2"/>
                    </div>
                    <DisplayQuestion question={QCM[currentQuestionIndex]} handleNext={handleNext}/>
                </>
            ) : (
                <EndPage/>
            )}
        </div>
    );
}