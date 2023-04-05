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