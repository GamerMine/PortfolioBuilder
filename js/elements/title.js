import {HTMLObject} from "./utils.js"
export class Title extends HTMLObject
{
    constructor(c_text,c_titleLevel) {
        super("title");
        this.text = c_text;                    //String
        this.titleLevel = c_titleLevel;         //int
        this.properties = ["color", "font-weight", "font-style", "font-family", "font-size"];
    }
}