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

export const FORM_NOT_STARTED = 0;
export const FORM_PROCESSING = 1;
export const FORM_ENDED = 2;
export const FORM_TIMED_OUT = 3;

export default function FormPage(){
    const session = useSession();
    const [currentQuestionIndex,setCurrentQuestionIndex] = useState<number>(0);
    const [currentTimer,setCurrentTimer] = useState<number>(0);
    const [formState,setFormState] = useState<number>(FORM_PROCESSING);
    const [error,setError] = useState<string|null>(null);
    const [addAnswer, { loading }] = useMutation(NEW_ANSWER_QUERY);

    const handleNext = (userResponse:Response) => {
        addAnswer({ variables: { answer: JSON.stringify(userResponse.responses), questionId: userResponse.questionId, userId:session.user!.id } }).then(({data}) =>{
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
        if(currentTimer >= QCM_TIME && formState === FORM_PROCESSING){
            setFormState(FORM_TIMED_OUT);
            setCurrentQuestionIndex(QCM.length+1);
        }
    },[currentTimer]);

    useEffect(() => {
        session.updateSession('formStep',currentQuestionIndex);
        if(currentQuestionIndex === QCM.length){
            setFormState(FORM_ENDED);
        }
    },[currentQuestionIndex]);

    useEffect(()=>{
        session.updateSession('formState',formState);
    },[formState])

    return (
        <div className="m-10 w-full">
            {(formState !== FORM_ENDED && formState !== FORM_TIMED_OUT) && QCM[currentQuestionIndex] !== undefined ? (
                <>
                    <div className="w-full text-center">
                        <progress className="w-64 bg-gray-300 appearance-none" max={QCM_TIME} value={currentTimer}>{currentTimer}</progress>
                    </div>
                    <div className="text-right italic text-lg flex justify-end">
                        <div className='my-auto'>Question {currentQuestionIndex + 1}/{QCM.length}</div>
                        <RiPushpin2Fill className="my-auto ml-2"/>
                    </div>
                    <DisplayQuestion question={QCM[currentQuestionIndex]} loading={loading} handleNext={handleNext}/>
                    {error && <ErrorDiv text={error}/>}
                </>
            ) : (
                <EndPage/>
            )}
        </div>
    );
}