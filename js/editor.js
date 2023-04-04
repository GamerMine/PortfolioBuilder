import {URL_BASE} from "./constants.js";
import {jsonToHTML} from "./elements/utils.js";
import {testJson} from "./elements/test.js";

loadPortfolio()

function loadPortfolio() {
    const request = new XMLHttpRequest();

    request.open("GET", URL_BASE+"server/requestData.php?command=PORTFOLIO_EXIST");
    request.send();

    request.onreadystatechange = () => {
        if (request.readyState === 4) {
            try {
                const response = JSON.parse(request.response);

                if (!response.connected) window.location.href = "../index.html";

                if (response.exist) {
                    showPortfolioHome();
                } else {
                    // TODO: Popup to ask for user informations
                }
            } catch (e) {
                window.location.href = "../index.html";
            }
        }
    }
}

function showPortfolioHome() {
    const request = new XMLHttpRequest();

    request.open("GET", URL_BASE+"server/requestData.php?command=GET_CONTENT&name=homecontent&visibility=editor");
    request.send();

    console.log(URL_BASE+"server/requestData.php?command=GET_CONTENT&name=homecontent&visibility=editor");

    request.onreadystatechange = () => {
        if (request.readyState === 4) {
            try {
                const response = JSON.parse(request.response);

                if (!response.connected) window.location.href = "../index.html";

                document.getElementById("portfolio-preview").src = "../template.html";

                const iframe = document.getElementById("portfolio-preview");

                console.log(response.content);
                iframe.onload = () => {
                    jsonToHTML(response.content, iframe.contentWindow.document.getElementById("content"));
                }
            } catch (e) {}
        }
    }
}

/*
<div>Titre</div>

<button class="button" id="btn-home" type="button">Accueil</button>


<button class="button" id="btn-project" type="button">Projet</button>


<button class="button" id="btn-skill" type="button">Compétence</button>


<button class="button" id="btn-a-propos" type="button">A propos</button>
*/
/*
<button class="button" id="btn-add" type="button">Ajouter élément</button>
*/


var lblTitre   = document.createElement("div");
var btnHome    = document.createElement("button");
var btnProject = document.createElement("button");
var btnSkill   = document.createElement("button");
var btnApropos = document.createElement("button");

var btnAjouter = document.createElement("button");


lblTitre.innerHTML = "Titre";

btnHome.setAttribute("class", "button");
btnHome.setAttribute("id", "btn-home");
btnHome.setAttribute("type", "button");
btnHome.innerHTML = "Accueil";

btnProject.setAttribute("class", "button");
btnProject.setAttribute("id", "btn-project");
btnProject.setAttribute("type", "button");
btnProject.innerHTML = "Projet";

btnSkill.setAttribute("class", "button");
btnSkill.setAttribute("id", "btn-skill");
btnSkill.setAttribute("type", "button");
btnSkill.innerHTML = "Compétence";

btnApropos.setAttribute("class", "button");
btnApropos.setAttribute("id", "btn-a-propos");
btnApropos.setAttribute("type", "button");
btnApropos.innerHTML = "A propos";


btnAjouter.setAttribute("class", "button");
btnAjouter.setAttribute("id", "btn-add");
btnAjouter.setAttribute("type", "button");


function toolsBase()
{
    var divSelect  = document.getElementById("btnselect");
    var divBottom  = document.getElementById("bottom");

    while (divSelect.firstChild)
    {
        divSelect.removeChild(divSelect.firstChild);
    }

    divBottom.removeChild(divBottom.firstChild);

    btnAjouter.innerHTML = "Ajouter élément";
    
    divSelect.appendChild(lblTitre);
    divSelect.appendChild(btnHome);
    divSelect.appendChild(btnProject);
    divSelect.appendChild(btnSkill);
    divSelect.appendChild(btnApropos);

    divBottom.appendChild(btnAjouter);


    document.getElementById("btn-add").addEventListener("click", modifTools, false);
}

/*
<div>Titre</div>

<button class="button" id="btn-txt" type="button">Accueil</button>


<button class="button" id="btn-img" type="button">Projet</button>


<button class="button" id="btn-link" type="button">Compétence</button>


<button class="button" id="btn-cv" type="button">A propos</button>
*/



var lblAjout   = document.createElement("div");
var btnTxt     = document.createElement("button");
var btnImg     = document.createElement("button");
var btnLink    = document.createElement("button");
var btnCv      = document.createElement("button");
var btnRetour  = document.createElement("button");

lblAjout.textContent = "Sélectionner un élément à ajouter :";

btnTxt.setAttribute("class", "button");
btnTxt.setAttribute("id", "btn-txt");
btnTxt.setAttribute("type", "button");
btnTxt.innerHTML = "Texte";

btnImg.setAttribute("class", "button");
btnImg.setAttribute("id", "btn-img");
btnImg.setAttribute("type", "button");
btnImg.innerHTML = "Image";

btnLink.setAttribute("class", "button");
btnLink.setAttribute("id", "btn-link");
btnLink.setAttribute("type", "button");
btnLink.innerHTML = "Lien";

btnCv.setAttribute("class", "button");
btnCv.setAttribute("id", "btn-cv");
btnCv.setAttribute("type", "button");
btnCv.innerHTML = "CV";

btnRetour.setAttribute("class", "button");
btnRetour.setAttribute("id", "btn-back");
btnRetour.setAttribute("type", "button");
btnRetour.innerHTML = "Retour";


function modifTools()
{

    var divBtnSelect  = document.getElementById("btnselect");
    var divBottom     = document.getElementById("bottom");

    while (divBtnSelect.firstChild)
    {
        divBtnSelect.removeChild(divBtnSelect.firstChild);
    }

    divBottom.removeChild(divBottom.firstChild);


    divBtnSelect.appendChild(lblAjout);
    divBtnSelect.appendChild(btnTxt);
    divBtnSelect.appendChild(btnImg);
    divBtnSelect.appendChild(btnLink);
    divBtnSelect.appendChild(btnCv);

    divBottom.appendChild(btnRetour);

    btnRetour.addEventListener("click", toolsBase, false);

    btnTxt .addEventListener("click", toolsText , false);
    btnImg .addEventListener("click", toolsImage, false);
    btnLink.addEventListener("click", toolsLien , false);
    btnCv  .addEventListener("click", toolsCV   , false);

}



function toolsText()
{
    var divSelect  = document.getElementById("btnselect");
    var divBottom  = document.getElementById("bottom");

    while (divSelect.firstChild)
    {
        divSelect.removeChild(divSelect.firstChild);
    }

    divBottom.removeChild(divBottom.firstChild);
}



function toolsImage()
{
    var divSelect  = document.getElementById("btnselect");
    var divBottom  = document.getElementById("bottom");

    while (divSelect.firstChild)
    {
        divSelect.removeChild(divSelect.firstChild);
    }

    divBottom.removeChild(divBottom.firstChild);
}



function toolsLien()
{
    var divSelect  = document.getElementById("btnselect");
    var divBottom  = document.getElementById("bottom");

    while (divSelect.firstChild)
    {
        divSelect.removeChild(divSelect.firstChild);
    }

    divBottom.removeChild(divBottom.firstChild);
}



function toolsCV()
{
    var divSelect  = document.getElementById("btnselect");
    var divBottom  = document.getElementById("bottom");

    while (divSelect.firstChild)
    {
        divSelect.removeChild(divSelect.firstChild);
    }

    divBottom.removeChild(divBottom.firstChild);
}