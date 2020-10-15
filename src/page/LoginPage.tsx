import React, {useContext, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";
import {sessionContext} from "../context/SessionContext";
import { useHistory } from 'react-router';

export default function LoginPage(){
    const [email, setEmail] = useState('');
    const [name,setName] = useState('');
    const session = useContext(sessionContext);
    const history = useHistory();

    const handleSubmit = (e:any) => {
        e.preventDefault();
        const form = document.querySelector('form');
        if(session !== undefined && form !== undefined && form !== null && form.reportValidity()){
            //TODO : API to add user then log in
            session.updateSession('user',JSON.stringify({email:email,name:name,id:'fdhsgfdgd56454df'}));
            history.push('/');
        }
    }

    return (
        <div className="text-lg flex h-screen bg-white w-screen">
            <form id="login-form" onSubmit={handleSubmit} className="m-auto w-100 shadow-lg bg-gray-300 flex flex-col p-6">
                <div className="my-6 w-full">
                    <input type="email" required className="w-full p-2 px-3 rounded" placeholder="Email" onChange={(e) => setEmail(e.currentTarget.value)}/>
                </div>
                <div className="my-6 w-full">
                    <input type="text" required className="w-full p-2 px-3 rounded" placeholder="NOM Prénom" onChange={(e) => setName(e.currentTarget.value)}/>
                </div>
                <div className="mt-10 flex">
                    <button onClick={handleSubmit} className="my-btn-anim select-none mx-auto px-4 py-2 rounded text-white bg-gradient-to-r from-teal-400 to-blue-500 shadow-md cursor-pointer transition duration-150 hover:shadow-lg">
                        Commencer
                        <FontAwesomeIcon className="ml-2 transition duration-150" icon={faArrowRight}/>
                    </button>
                </div>
            </form>
        </div>
    );
}