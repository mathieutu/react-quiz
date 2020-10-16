import React from 'react';
import {Question} from "./type/Question";

export const QCM_TIME = 20;

export const QCM:Array<Question> = [
    {
        id:'question-1',
        content:<>Quel est la capitale de la Roumanie ?</>,
        answers:[
            {key:'a',text:'Paris'},
            {key:'b',text:'Budapest'},
            {key:'c',text:'Bucarest'},
            {key:'d',text:'Berlin'}
        ]
    },
    {
        id:'question-2',
        content:<>Quel est le numéro du département Haute-Savoie ?</>,
        answers:[
            {key:'a',text:'74'},
            {key:'b',text:'71'},
            {key:'c',text:'53'},
            {key:'d',text:'65'}
        ]
    },
    {
        id:'question-3',
        content:<>ouais re ?</>,
        answers:[
            {key:'a',text:'oui'},
            {key:'b',text:'tg'},
            {key:'c',text:'non'},
            {key:'d',text:'azy'}
        ]
    },
]
