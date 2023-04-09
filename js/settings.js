import {page} from "./editor.js";
import {Style} from "./elements/style.js";
import {HTMLPage} from "./elements/htmlPage.js";


document.getElementById("img-settings").onclick = settingsGeneraux;

let btnQuitter = document.createElement("button");

btnQuitter.setAttribute("class", "button");
btnQuitter.setAttribute("id", "btn-quitter");
btnQuitter.setAttribute("type", "button");   
btnQuitter.innerHTML = "Quitter"; 

let divStyleGeneral = document.createElement("div");
divStyleGeneral.id = "style-general";

let lblStyleG = document.createElement("h3");
lblStyleG.textContent = "Style Général";



let divBG = document.createElement("div");
divBG.classList.add("spaced");

let lblColorBG = document.createElement("p");
lblColorBG.textContent = "Couleur d'arrière-plan :";

let colorPickerBG = document.createElement("input");
colorPickerBG.type = "color";
colorPickerBG.id = "color-picker-background";



let divHF = document.createElement("div");
divHF.classList.add("spaced");

let lblColorHF = document.createElement("p");
lblColorHF.textContent = "Couleur entête/pied :";

let colorPickerHF = document.createElement("input");
colorPickerHF.type = "color";
colorPickerHF.id = "color-picker-header-footer";



let divTextHF = document.createElement("div");
divTextHF.classList.add("spaced");

let lblColorTextHF = document.createElement("p");
lblColorTextHF.textContent = "Couleur du Text :";

let colorPickerTextHF = document.createElement("input");
colorPickerTextHF.type = "color";
colorPickerTextHF.id = "color-picker-text-header-footer";



let btnValidate = document.createElement("button");
    btnValidate.textContent="Valider";
    btnValidate.setAttribute("class", "green m-top");
    btnValidate.setAttribute("style", "margin-left:auto; margin-right: auto; width: fit-content;");

export function settingsGeneraux()
{
    const cursor = document.getElementById("cursor");
    const iframe = document.getElementById("portfolio-preview");

    let body = iframe.contentWindow.document.querySelector("body");
    let header = iframe.contentWindow.document.querySelector("header");
    let footer = iframe.contentWindow.document.querySelector("footer");

    btnValidate.addEventListener("click", () => {
        body.style.backgroundColor = colorPickerBG.value;
        header.style.backgroundColor = colorPickerHF.value;
        footer.style.backgroundColor = colorPickerHF.value;
        header.style.color = colorPickerTextHF.value;
        footer.style.color = colorPickerTextHF.value;

        page.addStyle(new Style("background-color", colorPickerBG.value), "body");
        page.addStyle(new Style("background-color", colorPickerHF.value), "header");
        page.addStyle(new Style("background-color", colorPickerHF.value), "footer");
        page.addStyle(new Style("color", colorPickerTextHF.value), "header");
        page.addStyle(new Style("color", colorPickerTextHF.value), "footer");

    });


    cursor.style.left = "";
    cursor.style.right = "26px";

    let divSelect  = document.getElementById("btnselect");
    let divBottom  = document.getElementById("bottom");

    while (divSelect.firstChild)
    {
        divSelect.removeChild(divSelect.firstChild);
    }

    while (divBottom.firstChild)
    {
        divBottom.removeChild(divBottom.firstChild);
    }

    colorPickerBG.value = rgbToHex(iframe.contentWindow.getComputedStyle(body).backgroundColor);
    colorPickerHF.value = rgbToHex(iframe.contentWindow.getComputedStyle(header).backgroundColor);
    colorPickerTextHF.value = rgbToHex(iframe.contentWindow.getComputedStyle(header).color);

    divBG.appendChild(lblColorBG);
    divBG.appendChild(colorPickerBG);

    divHF.appendChild(lblColorHF);
    divHF.appendChild(colorPickerHF);
    
    divTextHF.appendChild(lblColorTextHF);
    divTextHF.appendChild(colorPickerTextHF);

    divStyleGeneral.appendChild(lblStyleG);
    divStyleGeneral.appendChild(divBG);
    divStyleGeneral.appendChild(divHF);
    divStyleGeneral.appendChild(divTextHF);

    
    divStyleGeneral.appendChild(btnValidate);

    divSelect.appendChild(btnQuitter);
    divSelect.appendChild(divStyleGeneral);

    btnQuitter.addEventListener('click', (event) => 
    {
        window.location.href = "../index.html";
    });

}   

export function rgbToHex(rgb){
    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]); 
}

export function hex(x) {
    return ("0" + parseInt(x).toString(16)).slice(-2);
}