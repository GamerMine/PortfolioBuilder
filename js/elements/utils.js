import {Title} from "./title.js";
import {Paragraph} from "./paragraph.js";
import {HTMLPage} from "./htmlPage.js";
import {Link} from "./link.js";
import {Picture} from "./image.js";
import {Button} from "./button.js";
import {PDFView} from "./pdfView.js";

export function jsonToPage(json_content, container) {

    let parse_json = JSON.parse(json_content);
    try {
        if (parse_json.objectList == null) return;
        parse_json = parse_json.objectList;
    } catch (e) {
        return;
    }

    for (const object of parse_json) {
        switch (object.identifier) {
            case 'a' :
                let link = new Link(object.text,object.link);
                container.addObject = link;
                break;
            case 'p' :
                let para = new Paragraph(object.text);
                container.addObject = para;
                break;
            case 'title' :
                let title = new Title(object.text,object.titleLevel);
                container.addObject = title;
                break;
            case 'img' :
                let img = new Picture(object.imgLink,object.alt);
                container.addObject = img;
                break;
            case 'button' :
                let button = new Button(object.text);
                container.addObject = button;
                break;
            case 'pdfView' :
                let pdf = new PDFView(object.pdfLink);
                container.addObject = pdf;
                break;
        }
    }
}
export async function pageToHTML(pageIn, container, isInEditor = false) {

    let editor;

    if (isInEditor) {
        editor = await import("../editor.js");
    }

    let new_page = pageIn.objectList;

    for (const object of new_page) {
        switch (object.identifier) {
            case 'a' :
                let node_link = document.createElement(object.identifier);
                node_link.setAttribute("href", object.link);
                node_link.textContent = object.text;
                node_link.setAttribute("id", new_page.indexOf(object));
                if (isInEditor) {
                    node_link.onclick = (e) => {
                        editor.modifElement(e.target);
                    }
                }
                container.appendChild(node_link);
                container.appendChild(document.createElement("br"));
                break;
            case 'p' :
                let node_paragraph = document.createElement(object.identifier);
                node_paragraph.textContent = object.text;
                node_paragraph.setAttribute("id", new_page.indexOf(object));
                if (isInEditor) {
                    node_paragraph.onclick = (e) => {
                        editor.modifElement(e.target);
                    }
                }
                container.appendChild(node_paragraph);
                break;
            case 'title' :
                let node_title = document.createElement("h" + object.titleLevel);
                node_title.textContent = object.text;
                node_title.setAttribute("id", new_page.indexOf(object));
                if (isInEditor) {
                    //const a = document.createElement("a");
                    node_title.onclick = (e) => {
                        editor.modifElement(e.target);
                    }
                }
                container.appendChild(node_title);
                break;
            case 'img' :
                let node_img = document.createElement(object.identifier);
                node_img.setAttribute("src", object.imgLink);
                node_img.setAttribute("alt", object.alt);
                node_img.setAttribute("id", new_page.indexOf(object));
                if (isInEditor) {
                    node_img.onclick = (e) => {
                        editor.modifElement(e.target);
                    }
                }
                container.appendChild(node_img);
                container.appendChild(document.createElement("br"));
                break;
            case 'button' :
                let node_button = document.createElement(object.identifier);
                node_button.textContent = object.text;
                node_button.setAttribute("id", new_page.indexOf(object));
                if (isInEditor) {
                    node_button.onclick = (e) => {
                        editor.modifElement(e.target);
                    }
                }
                container.appendChild(node_button);
                container.appendChild(document.createElement("br"));
                break;
            case 'pdfView' :
                let node_pdf = document.createElement("iframe");
                node_pdf.setAttribute("src", object.pdfLink);
                node_pdf.setAttribute("height", "1000vh");
                node_pdf.setAttribute("width", "100%");
                node_pdf.setAttribute("id", new_page.indexOf(object));
                if (isInEditor) {
                    node_pdf.onclick = (e) => {
                        editor.modifElement(e.target);
                    }
                }
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

export function request(method, url) {
    return new Promise(function (resolve, reject) {
        const request = new XMLHttpRequest();
        try {
            request.open(method, url);
            request.onload = () => {
                if (request.status >= 200 && request.status < 300) {
                    resolve(request.response);
                } else {
                    reject({
                        status: request.status,
                        statusText: request.statusText
                    });
                }
            }
            request.onerror = () => {
                reject({
                    status: request.status,
                    statusText: request.statusText
                });
            }
            request.send();
        } catch (e) {
            reject({
                status: request.status,
                statusText: request.statusText
            });
        }
    })
}

export function requestText(method, url) {
    return new Promise(function (resolve, reject) {
        const request = new XMLHttpRequest();
        try {
            request.open(method, url);
            request.onload = () => {
                if (request.status >= 200 && request.status < 300) {
                    resolve(request.responseText);
                } else {
                    reject({
                        status: request.status,
                        statusText: request.statusText
                    });
                }
            }
            request.onerror = () => {
                reject({
                    status: request.status,
                    statusText: request.statusText
                });
            }
            request.send();
        } catch (e) {
            reject({
                status: request.status,
                statusText: request.statusText
            });
        }
    })
}

export function sendFile(url, formData) {
    return new Promise(function (resolve, reject) {
        const request = new XMLHttpRequest();
        try {
            request.open("POST", url);
            request.onload = () => {
                if (request.status >= 200 && request.status < 300) {
                    resolve(request.response);
                } else {
                    reject({
                        status: request.status,
                        statusText: request.statusText
                    });
                }
            }
            request.onerror = () => {
                reject({
                    status: request.status,
                    statusText: request.statusText
                });
            }
            request.send(formData);
        } catch (e) {
            reject({
                status: request.status,
                statusText: request.statusText
            });
        }
    })
}