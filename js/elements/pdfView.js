import {HTMLObject} from "./utils.js"
export class PDFView extends HTMLObject
{
    constructor(c_link) {
        super("pdfView");
        this.pdfLink = c_link;            // String
        this.properties = [""];     //TODO : mettre les styles possibles
    }
    get getPDFLink()
    {
        return this.pdfLink;
    }
}