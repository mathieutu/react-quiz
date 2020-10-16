import React from 'react';
import {useSession} from "../context/SessionContext";
import Button from "../component/Button";

type Props = {
    isTimeOut:boolean
};

export default function EndPage(props:Props){
    const session = useSession();

    const handleQuit = () => {
        session.updateSession('logout');
    };

    return (
        <div className="mx-16 my-10 text-lg flex flex-col">
            <div className="text-2xl text-center">
                {
                    props.isTimeOut ? 'Le temps est écoulé, les réponses envoyées ont bien été enregistrées.'
                        : 'Merci, les réponses ont été enregistrées :)'
                }
            </div>
            <div className="mt-10 text-lg text-center">
                <Button handleOnClick={handleQuit} text={'Bye bye'}/>
            </div>
        </div>
    );
}