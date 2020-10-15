import React from 'react';
import {QCM} from "../Data";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";

export default function HomePage(){
    return (
        <div className="flex h-full flex-col mx-24 mt-16 text-lg">
            <div className="pl-6 border-l-2">
                <div className="mb-6">
                    <b>Attention</b>, prenez connaissance des règles ci-dessous avant de commencer le questionnaire :
                </div>
                <div>
                    Le formulaire comporte {QCM.length} questions. Suivant les questions, <span className="underline">plusieurs réponses sont possibles</span> (ou parfois une seule).
                    <br/>Dès lors que vous avez choisi votre/vos réponses pour la question en cours, cliquez sur le bouton suivant.
                    Aucun retour en arrière n'est possible, <span className="underline">soyez sûrs de vous avant de répondre !</span>
                </div>
            </div>
            <div className="mt-10 flex">
                <div className="my-btn-anim select-none mx-auto px-4 py-2 rounded text-white bg-gradient-to-r from-teal-400 to-blue-500 shadow-md cursor-pointer transition duration-150 hover:shadow-lg">
                    Ok, let's go
                    <FontAwesomeIcon className="ml-2 transition duration-150" icon={faArrowRight}/>
                </div>
            </div>
        </div>
    );
}