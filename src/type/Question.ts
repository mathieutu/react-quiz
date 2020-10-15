import {Answer} from "./Answer";
import {ReactNode} from "react";

export type Question = {
    content:ReactNode,
    id:string,
    answers:Array<Answer>
}