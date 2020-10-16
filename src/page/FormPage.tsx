import React, {useEffect, useState} from 'react';
import {QCM, QCM_TIME} from "../Data";
import DisplayQuestion from "../component/DisplayQuestion";
import {Response} from "../type/Response";
import {useSession} from "../context/SessionContext";
import EndPage from "./EndPage";
import {RiPushpin2Fill} from "react-icons/all";
import {useMutation} from "@apollo/client";
import {NEW_ANSWER_QUERY} from "../utils/queries";
import ErrorDiv from "../component/ErrorDiv";

export default function FormPage(){
    const [currentQuestionIndex,setCurrentQuestionIndex] = useState<number>(0);
    const [currentTimer,setCurrentTimer] = useState<number>(0);
    const [formFullyEnded,setFormFullyEnded] = useState<boolean>(false);
    const [error,setError] = useState<string|null>(null);
    const session = useSession();
    const [addAnswer, { loading }] = useMutation(NEW_ANSWER_QUERY);

    const handleNext = (userResponse:Response) => {
        addAnswer({ variables: { answer: JSON.stringify(userResponse.responses), questionId: userResponse.questionId, userId:session.user!.id } }).then(({data}) =>{
            session.updateSession('formStep',currentQuestionIndex + 1);
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }).catch((e) => {
            console.log(e);
            setError(e.message);
        });
    };

    useEffect(() => {
        if(session.formStep !== undefined){
            setCurrentQuestionIndex(session.formStep);
        }
        const timeInterval = setInterval(()=>{
            setCurrentTimer((prevState) => {
                if((prevState + 1) <= QCM_TIME){
                    return prevState + 1;
                }
                clearInterval(timeInterval);
                return prevState;
            });
        },1000);
    },[]);

    useEffect(() => {
        if(currentTimer >= QCM_TIME){
            setCurrentQuestionIndex(QCM.length+1);
        }
    },[currentTimer]);

    useEffect(() => {
        if(currentQuestionIndex === QCM.length){
            setFormFullyEnded(true);
        }
    },[currentQuestionIndex])

    return (
        <div className="m-10 w-full">
            {QCM[currentQuestionIndex] !== undefined ? (
                <>
                    <div className="w-full text-center">
                        <progress className="w-64" max={QCM_TIME} value={currentTimer}>{currentTimer}</progress>
                    </div>
                    <div className="text-right italic text-lg flex justify-end">
                        <div className='my-auto'>Question {currentQuestionIndex + 1}/{QCM.length}</div>
                        <RiPushpin2Fill className="my-auto ml-2"/>
                    </div>
                    <DisplayQuestion question={QCM[currentQuestionIndex]} loading={loading} handleNext={handleNext}/>
                    {error && <ErrorDiv text={error}/>}
                </>
            ) : (
                <EndPage isTimeOut={!formFullyEnded}/>
            )}
        </div>
    );
}