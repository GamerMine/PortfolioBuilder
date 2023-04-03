import {HTMLObject} from "./utils.js"
export class Paragraph extends HTMLObject
{
    constructor(c_text) {
        super("paragraph");
        this.text = c_text;                //String
        console.log("paragraphe enregistré");
        this.properties = [""];     //TODO : mettre les styles possibles
    }
}