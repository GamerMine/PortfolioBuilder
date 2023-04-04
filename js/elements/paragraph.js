import {HTMLObject} from "./utils.js"
export class Paragraph extends HTMLObject
{
    constructor(c_text) {
        super("p");
        this.text = c_text;                //String
        this.properties = ["color", "font-weight", "font-style", "font-family", "font-size"];
    }
}