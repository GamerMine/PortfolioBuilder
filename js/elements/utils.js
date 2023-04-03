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

export function jsonToHTML(json_content) {

    const parse_json = JSON.parse(json_content).objectList;

    for (const object of parse_json) {
        switch (object.identifier) {
            case 'a' :
                let node_link = document.createElement(object.identifier);
                node_link.setAttribute("href", object.link);
                node_link.textContent = object.text;
                document.body.appendChild(node_link);
                document.body.appendChild(document.createElement("br"));
                break;
            case 'p' :
                let node_paragraph = document.createElement(object.identifier);
                node_paragraph.textContent = object.text;
                document.body.appendChild(node_paragraph);
                document.body.appendChild(document.createElement("br"));
                break;
            case 'title' :
                let node_title = document.createElement("h" + object.titleLevel);
                node_title.textContent = object.text;
                document.body.appendChild(node_title);
                document.body.appendChild(document.createElement("br"));
                break;
            case 'img' :
                let node_img = document.createElement(object.identifier);
                node_img.setAttribute("src", object.imgLink);
                console.log(object.imgLink)
                node_img.setAttribute("alt", object.alt);
                document.body.appendChild(node_img);
                document.body.appendChild(document.createElement("br"));
                break;
            case 'button' :
                let node_button = document.createElement(object.identifier);
                node_button.textContent = object.text;
                document.body.appendChild(node_button);
                document.body.appendChild(document.createElement("br"));
                break;
            case 'pdfView' :
                let node_pdf = document.createElement("iframe");
                node_pdf.setAttribute("src",object.pdfLink);
                node_pdf.setAttribute("height","1000vh");
                node_pdf.setAttribute("width","100%");
                document.body.appendChild(node_pdf);
                document.body.appendChild(document.createElement("br"));
                break;
        }
    }
}