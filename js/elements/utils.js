import {Title} from "./title.js";
import {Paragraph} from "./paragraph.js";
import {HTMLPage} from "./htmlPage.js";
import {Link} from "./link.js";
import {Picture} from "./image.js";
import {Button} from "./button.js";
import {PDFView} from "./pdfView.js";
import {Style} from "./style.js";

export function jsonToPage(json_content, container) {

    let parsedObjectList = JSON.parse(json_content);
    let parsedStyleList = null;
    try {
        if (parsedObjectList.objectList == null) return;
        parsedStyleList = parsedObjectList.styleList;
        parsedObjectList = parsedObjectList.objectList;
    } catch (e) {
        return;
    }

    for (const style of parsedStyleList.header) {
        container.addStyle(new Style(style.property, style.value), "header");
    }
    for (const style of parsedStyleList.body) {
        container.addStyle(new Style(style.property, style.value), "body");
    }
    for (const style of parsedStyleList.footer) {
        container.addStyle(new Style(style.property, style.value), "footer");
    }

    for (const object of parsedObjectList) {
        let htmlobject;
        switch (object.identifier) {
            case 'a' :
                htmlobject = new Link(object.text,object.link);
                container.addObject = htmlobject;
                break;
            case 'p' :
                htmlobject = new Paragraph(object.text);
                container.addObject = htmlobject;
                break;
            case 'title' :
                htmlobject = new Title(object.text,object.titleLevel);
                container.addObject = htmlobject;
                break;
            case 'img' :
                htmlobject = new Picture(object.imgLink,object.alt);
                container.addObject = htmlobject;
                break;
            case 'button' :
                htmlobject = new Button(object.text);
                container.addObject = htmlobject;
                break;
            case 'pdfView' :
                htmlobject = new PDFView(object.pdfLink);
                container.addObject = htmlobject;
                break;
        }

        for (const style of object.styleList) {
            htmlobject.addStyleStyle = new Style(style.property, style.value);
        }
    }
}
export async function pageToHTML(pageIn, container, isInEditor = false) {

    let editor;

    if (isInEditor) {
        editor = await import("../editor.js");
    }

    let new_page = pageIn.objectList;

    for (const style of pageIn.styleList.header) {
        container.parentElement.querySelector("header").style.cssText += style.getProperty+":"+style.getValue+";";
    }
    for (const style of pageIn.styleList.body) {
        console.log(container.parentElement.querySelector("main").parentElement);
        container.parentElement.querySelector("main").parentElement.style.cssText += style.getProperty+":"+style.getValue+";";
    }
    for (const style of pageIn.styleList.footer) {
        container.parentElement.querySelector("footer").style.cssText += style.getProperty+":"+style.getValue+";";
    }

    for (const object of new_page) {
        switch (object.identifier) {
            case 'a' :
                let node_link = document.createElement(object.identifier);
                node_link.setAttribute("href", object.link);
                node_link.textContent = object.text;
                node_link.setAttribute("id", new_page.indexOf(object));
                for (const style of object.getStyleList) node_link.style.cssText += style.getProperty + ":" + style.getValue + ";";
                if (isInEditor) node_link.onclick = (e) => editor.modifElement(e.target);
                container.appendChild(node_link);
                container.appendChild(document.createElement("br"));
                break;
            case 'p' :
                let node_paragraph = document.createElement(object.identifier);
                node_paragraph.textContent = object.text;
                node_paragraph.setAttribute("id", new_page.indexOf(object));
                for (const style of object.getStyleList) node_paragraph.style.cssText += style.getProperty + ":" + style.getValue + ";";
                if (isInEditor) node_paragraph.onclick = (e) => editor.modifElement(e.target);
                container.appendChild(node_paragraph);
                break;
            case 'title' :
                let node_title = document.createElement("h" + object.titleLevel);
                node_title.textContent = object.text;
                node_title.setAttribute("id", new_page.indexOf(object));
                for (const style of object.getStyleList) node_title.style.cssText += style.getProperty + ":" + style.getValue + ";";
                if (isInEditor) node_title.onclick = (e) => editor.modifElement(e.target);
                container.appendChild(node_title);
                break;
            case 'img' :
                let node_img = document.createElement(object.identifier);
                node_img.setAttribute("src", object.imgLink);
                node_img.setAttribute("alt", object.alt);
                node_img.setAttribute("id", new_page.indexOf(object));
                for (const style of object.getStyleList) node_img.style.cssText += style.getProperty + ":" + style.getValue + ";";
                if (isInEditor) node_img.onclick = (e) => editor.modifElement(e.target);
                container.appendChild(node_img);
                container.appendChild(document.createElement("br"));
                break;
            case 'button' :
                let node_button = document.createElement(object.identifier);
                node_button.textContent = object.text;
                node_button.setAttribute("id", new_page.indexOf(object));
                for (const style of object.getStyleList) node_button.style.cssText += style.getProperty + ":" + style.getValue + ";";
                if (isInEditor) node_button.onclick = (e) => editor.modifElement(e.target);
                container.appendChild(node_button);
                container.appendChild(document.createElement("br"));
                break;
            case 'pdfView' :
                let node_pdf = document.createElement("iframe");
                node_pdf.setAttribute("src", object.pdfLink);
                node_pdf.setAttribute("height", "1000vh");
                node_pdf.setAttribute("width", "100%");
                node_pdf.setAttribute("id", new_page.indexOf(object));
                for (const style of object.getStyleList) node_pdf.style.cssText += style.getProperty + ":" + style.getValue + ";";
                if (isInEditor) node_pdf.onclick = (e) => editor.modifElement(e.target);
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