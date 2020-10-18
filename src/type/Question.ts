import {PossibleAnswer} from "./PossibleAnswer";
import {ReactNode} from "react";

export type Question = {
    content:ReactNode,
    id:string,
    possibleAnswers:Array<PossibleAnswer>
}