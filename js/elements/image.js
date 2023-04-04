import {HTMLObject} from "./htmlObject.js"
export class Picture extends HTMLObject
{
    constructor(c_link,c_alt) {
        super("img");
        this.imgLink = c_link;        //String
        this.alt = c_alt;          //String
        this.properties=[""];   //TODO : mettre les styles possibles
    }

    get getImgLink()
    {
        return this.imgLink;
    }

    get getAlt()
    {
        return this.alt;
    }
}