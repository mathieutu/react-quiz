import React, {useEffect, useState} from 'react';
import {Question} from "../type/Question";
import {removeFromArray} from "../functions";
import {Response} from "../type/Response";

type Props = {
    question:Question,
    handleNext(response:Response) :void,
}

export default function DisplayQuestion(props:Props){
    const [userResponse,setUserResponse] = useState<Array<string>>([]);

    useEffect(() => {
        setUserResponse([]);
    },[props.question])

    const handleResponseChange = (e:any) => {
        const value:string = e.currentTarget.value;
        let newResponses = userResponse;
        if(!newResponses.includes(value)){
            newResponses.push(value);
        }else{
            newResponses = removeFromArray(value,newResponses);
        }
        setUserResponse(newResponses);
    }

    return(
        <div>
            {props.question.content}
            {props.question.answers.map((answer) =>{
                return (
                    <div key={props.question.id + '-' + answer.key}>
                        <input type="checkbox" defaultChecked={false} id={'response-'+ props.question.id +'-'+answer.key} value={answer.key} onChange={handleResponseChange}/>
                        <label htmlFor={'response-'+ props.question.id +'-'+answer.key}>{answer.text}</label>
                    </div>
                );
            })}
            <div className="flex">
                <div onClick={() => {props.handleNext({question_id:props.question.id,responses:userResponse})}} className="form-btn hover:bg-white hover:text-blue-600 border border-blue-400 bg-blue-400 px-3 py-1 mx-2 cursor-pointer select-none rounded transition duration-150">Suivant</div>
            </div>
        </div>
    );
}