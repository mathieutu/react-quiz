import React, {FormEvent, useContext, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";
import {sessionContext} from "../context/SessionContext";
import { useHistory } from 'react-router';
import Button from "../component/Button";
import {useMutation} from "@apollo/client";
import {CgSpinnerTwoAlt} from "react-icons/all";
import {NEW_USER_QUERY} from "../utils/queries";
import {User} from "../type/User";
import ErrorDiv from "../component/ErrorDiv";

export default function LoginPage(){
    const [email, setEmail] = useState<string>('');
    const [name,setName] = useState<string>('');
    const session = useContext(sessionContext);
    const history = useHistory();
    const [formError, setFormError] = useState<string|null>(null);
    const [addUser, { loading }] = useMutation(NEW_USER_QUERY);

    const handleSubmit = (e:FormEvent) => {
        e.preventDefault();

        if(session !== undefined){
            if(!checkLoginForm()){
                setFormError("Veuillez renseigner l'email ET le nom par des valeurs valides");
            }else{
                addUser({ variables: { email, name } }).then(({ data })=>{
                    const newUser: User = data.addUser;
                    session.update({...session.state,user:newUser});
                    history.push('/');
                }).catch((e)=>{
                    setFormError(e.message);
                });
            }
        }
    };

    const checkLoginForm = () => {
        return email.length > 0 && email.includes('@') && name.length > 0
    };

    return (
        <div className="text-lg flex h-screen bg-white w-screen">
            <form onSubmit={handleSubmit} className="m-auto w-100 shadow-lg bg-gray-300 flex flex-col p-6">
                {formError && <ErrorDiv text={formError}/>}
                <div className="my-4 w-full">
                    <label className="mb-2">Email <span className="text-red-800">*</span></label>
                    <input type="email" required className="w-full focus:shadow-lg p-2 px-3 rounded" placeholder="exemple@domaine.com" onChange={(e) => setEmail(e.currentTarget.value)}/>
                </div>
                <div className="my-4 w-full">
                    <label className="mb-2">Nom et Prénom <span className="text-red-800">*</span></label>
                    <input type="text" required className="w-full focus:shadow-lg p-2 px-3 rounded" placeholder="Jean Dupont" onChange={(e) => setName(e.currentTarget.value)}/>
                </div>
                <div className="mt-8 flex">
                    <Button text={loading ? 'Chargement' : 'Commencer'}
                            icon={loading ? <CgSpinnerTwoAlt className="ml-2 animate-spin"/> : <FontAwesomeIcon className="ml-2 transition duration-150" icon={faArrowRight}/>}/>
                </div>
            </form>
        </div>
    );
}