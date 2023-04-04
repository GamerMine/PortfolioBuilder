import {HTMLPage} from "./htmlPage.js";
import {Title} from "./title.js";
import {Paragraph} from "./paragraph.js";
import {Link} from "./link.js";
import {Picture} from "./image.js";
import {Button} from "./button.js";
import {PDFView} from "./pdfView.js";

export function testJson()
{
    let page = new HTMLPage();

    let titre = new Title("patate",2);
    let para = new Paragraph("Bonjour, ceci est un test de paragraphe");
    let link = new Link("on fait des tests","au.cas.ou");
    let image = new Picture("./images.jpg","elle marche pô");
    let button = new Button("JE SUIS UN BOUTON CLIQUEZ-MOI");
    let pdf = new PDFView("https://pdf1.alldatasheet.fr/pdfjsview/web/viewer.html?file=//pdf1.alldatasheet.fr/datasheet-pdf/view/25575/STMICROELECTRONICS/ULN2003/+Q4WJ7UORlHDyRHOIpa/1XXyxeoia+IHpM+/datasheet.pdf");

    page.addObject = link ;
    page.addObject = para;
    page.addObject = titre;
    page.addObject = image;
    page.addObject = button;
    page.addObject = pdf;

    return JSON.stringify(page);
}