import React from 'react';
import {useSession} from "../context/SessionContext";
import Button from "../component/Button";
import {FORM_STATE} from "./FormPage";
import {useHistory} from 'react-router';

export default function EndPage(){
    const session = useSession();
    const history = useHistory();

    const handleQuit = () => {
        session.logout();
        history.push('/');
    };

    return (
        <div className="mx-16 my-10 text-lg flex flex-col">
            <div className="text-2xl text-center">
                {
                    session.state.formState === FORM_STATE.TIMED_OUT ? 'Le temps est écoulé, les réponses envoyées ont bien été enregistrées.'
                        : 'Merci, les réponses ont été enregistrées :)'
                }
            </div>
            <div className="mt-10 text-lg text-center">
                <Button handleOnClick={handleQuit} text={'Bye bye'}/>
            </div>
        </div>
    );
}