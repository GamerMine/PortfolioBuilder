import {HTMLObject} from "./utils.js"
export class Image extends HTMLObject
{
    constructor(c_link,c_alt) {
        super("image");
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