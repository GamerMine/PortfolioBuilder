export class HTMLObject{
    constructor(id) {
        this.identifier = id;         // De type String
        this.properties = [];     // De type String
        this.styleList = [] ;     // De type Style
    }

    get getIdentifier() { return this.identifier; }
    get getProperties() { return this.properties; }
    get getStyleList() { return this.styleList; }
    set addStyleStyle(style) { this.styleList.push(style); }
}

export function jsonToHTML(json_content, container) {

    const parse_json = JSON.parse(json_content).objectList;

    for (const object of parse_json) {
        switch (object.identifier) {
            case 'a' :
                let node_link = document.createElement(object.identifier);
                node_link.setAttribute("href", object.link);
                node_link.textContent = object.text;
                container.appendChild(node_link);
                container.appendChild(document.createElement("br"));
                break;
            case 'p' :
                let node_paragraph = document.createElement(object.identifier);
                node_paragraph.textContent = object.text;
                container.appendChild(node_paragraph);
                container.appendChild(document.createElement("br"));
                break;
            case 'title' :
                let node_title = document.createElement("h" + object.titleLevel);
                node_title.textContent = object.text;
                container.appendChild(node_title);
                container.appendChild(document.createElement("br"));
                break;
            case 'img' :
                let node_img = document.createElement(object.identifier);
                node_img.setAttribute("src", object.imgLink);
                node_img.setAttribute("alt", object.alt);
                container.appendChild(node_img);
                container.appendChild(document.createElement("br"));
                break;
            case 'button' :
                let node_button = document.createElement(object.identifier);
                node_button.textContent = object.text;
                container.appendChild(node_button);
                container.appendChild(document.createElement("br"));
                break;
            case 'pdfView' :
                let node_pdf = document.createElement("iframe");
                node_pdf.setAttribute("src",object.pdfLink);
                node_pdf.setAttribute("height","1000vh");
                node_pdf.setAttribute("width","100%");
                container.appendChild(node_pdf);
                container.appendChild(document.createElement("br"));
                break;
        }
    }
}

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