import {HTMLObject} from "./utils.js"
export class Link extends HTMLObject
{
    constructor(c_text,c_link) {
        super("a");
        this.text = c_text;            //String
        this.link = c_link;         //String
        this.properties=[""];       //TODO : mettre les styles possibles
    }
    get getText()
    {
        return this.text;
    }
    get getLink()
    {
        return this.link;
    }
}