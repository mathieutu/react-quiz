import React, {useEffect, useState} from 'react';
import {Question} from "../type/Question";
import {removeFromArray} from "../functions";

type Props = {
    question:Question,
    handleNext() :void,
}

export default function DisplayQuestion(props:Props){
    const [responses,setResponses] = useState<Array<string>>([]);

    useEffect(() => {console.log(responses)},[responses])

    const handleResponseChange = (e:any) => {
        const value:string = e.currentTarget.value;
        let newResponses = responses;
        if(!newResponses.includes(value)){
            newResponses.push(value);
        }else{
            newResponses = removeFromArray(value,newResponses);
        }
        setResponses(newResponses);
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
                <div onClick={() => {props.handleNext()}} className="form-btn hover:bg-white hover:text-blue-600 border border-blue-400 bg-blue-400 px-3 py-1 mx-2 cursor-pointer select-none rounded transition duration-150">Suivant</div>
            </div>
        </div>
    );
}