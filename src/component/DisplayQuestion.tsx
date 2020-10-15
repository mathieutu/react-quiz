import React, {useEffect, useState} from 'react';
import {Question} from "../type/Question";
import {removeFromArray} from "../functions";
import {Response} from "../type/Response";
import { FaRegSquare, FaRegCheckSquare } from 'react-icons/fa';

type Props = {
    question:Question,
    handleNext(response:Response) :void,
}

export default function DisplayQuestion(props:Props){
    const [userResponse,setUserResponse] = useState<Array<string>>([]);

    useEffect(() => {
        setUserResponse([]);
    },[props.question]);

    const handleResponseChange = (e:any) => {
        const value:string = e.currentTarget.value;
        let newResponses = userResponse;
        if(!newResponses.includes(value)){
            newResponses.push(value);
        }else{
            newResponses = removeFromArray(value,newResponses);
        }
        setUserResponse(newResponses);
    };

    const answers = (
        <>
            {props.question.answers.map((answer) =>{
                return (
                    <div key={props.question.id + '-' + answer.key} className="my-4 flex text-lg ml-4">
                        <input type="checkbox" defaultChecked={false} className="cursor-pointer my-auto" id={'response-'+ props.question.id +'-'+answer.key} value={answer.key} onChange={handleResponseChange}/>
                        <label className="ml-2 cursor-pointer" htmlFor={'response-'+ props.question.id +'-'+answer.key}>{answer.text}</label>
                    </div>
                );
            })}
        </>
    );

    return(
        <div>
            <div className="text-xl">{props.question.content}</div><hr className="my-2"/>
            {answers}
            <div className="flex mt-6">
                <div onClick={() => {props.handleNext({question_id:props.question.id,responses:userResponse})}}
                     className="my-btn-anim hover:bg-white hover:text-blue-600 text-white border border-blue-400 bg-blue-400 px-3 py-1 mx-2 cursor-pointer select-none rounded transition duration-150">Suivant</div>
            </div>
        </div>
    );
}