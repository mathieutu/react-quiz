import React, {useEffect, useState} from 'react';
import {QCM} from "../Data";
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
    const [error,setError] = useState<string|null>(null);
    const session = useSession();
    const [addAnswer, { loading }] = useMutation(NEW_ANSWER_QUERY);

    const handleNext = (userResponse:Response) => {
        //TODO : request API send
        addAnswer({ variables: { answer: JSON.stringify(userResponse.responses), questionId: userResponse.questionId, userId:session.user!.id } }).then(({data}) =>{
            console.log(data);
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
    },[]);

    return (
        <div className="m-10 w-full">
            {QCM[currentQuestionIndex] !== undefined ? (
                <>
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