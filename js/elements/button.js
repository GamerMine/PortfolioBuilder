import {HTMLObject} from "./utils.js"
export class Button extends HTMLObject
{
    constructor(c_text)
    {
        super("button");
        this.text = c_text;           //String
        this.properties = [""]; //TODO : mettre les styles possibles
    }

    get getText()
    {
        return this.text;
    }
}