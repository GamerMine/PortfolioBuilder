import {URL_BASE} from "./constants.js";
import {jsonToHTML, request} from "./elements/utils.js";

loadPortfolio()

async function loadPortfolio() {
    const resp = await request("GET", URL_BASE+"server/requestData.php?command=PORTFOLIO_EXIST");

    try {
        const response = JSON.parse(resp);

        if (!response.connected) window.location.href = "../index.html";

        if (response.exist) {
            showPortfolioHome();
        } else {
            // TODO: Popup to ask for user informations
        }
    } catch (e) {
        window.location.href = "../index.html";
        console.log(e);
    }
}

async function showPortfolioHome() {
    const resp = await request("GET", URL_BASE+"server/requestData.php?command=GET_CONTENT&name=homecontent&visibility=editor");
    try {
        const response = JSON.parse(resp);

        if (!response.connected) window.location.href = "../index.html";

        document.getElementById("portfolio-preview").src = "../template.html";

        const iframe = document.getElementById("portfolio-preview");

        console.log(response.content);
        iframe.onload = () => {
            jsonToHTML(response.content, iframe.contentWindow.document.getElementById("content"));
        }
    } catch (e) {}
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


let lblTitre   = document.createElement("div");
let btnHome    = document.createElement("button");
let btnProject = document.createElement("button");
let btnSkill   = document.createElement("button");
let btnApropos = document.createElement("button");

let btnAjouter = document.createElement("button");


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

document.getElementById("img-tools").onclick = toolsBase;

function toolsBase()
{
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



let lblAjout   = document.createElement("div");
let btnTxt     = document.createElement("button");
let btnImg     = document.createElement("button");
let btnLink    = document.createElement("button");
let btnCv      = document.createElement("button");
let btnRetour  = document.createElement("button");

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

    let divBtnSelect  = document.getElementById("btnselect");
    let divBottom     = document.getElementById("bottom");

    while (divBtnSelect.firstChild)
    {
        divBtnSelect.removeChild(divBtnSelect.firstChild);
    }

    while (divBottom.firstChild)
    {
        divBottom.removeChild(divBottom.firstChild);
    }   



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



/*
<select name="text" id="text-select">
    <option value="titre">Titre</option>
    <option value="titre1">Titre 1</option>
    <option value="titre2">Titre 2</option>
    <option value="titre3">Titre 3</option>
    <option value="titre4">Titre 4</option>
    <option value="titre5">Titre 5</option>
    <option value="paragraphe">Paragraphe</option>
</select>
*/
function toolsText()
{
    let divSelect  = document.getElementById("btnselect");
    let divBottom  = document.getElementById("bottom");

    while (divSelect.firstChild)
    {
        divSelect.removeChild(divSelect.firstChild);
    }

    divBottom.removeChild(divBottom.firstChild);

    let lblTexte = document.createElement("div");

    let select      = document.createElement("select");
    let titre       = document.createElement("option");
    let titre1      = document.createElement("option");
    let titre2      = document.createElement("option");
    let titre3      = document.createElement("option");
    let titre4      = document.createElement("option");
    let titre5      = document.createElement("option");
    let paragraphe  = document.createElement("option");

    lblTexte.textContent = "Sélectionner un élément à ajouter :";

    select.setAttribute("name", "text");
    select.setAttribute("id", "text-select");

    option1.setAttribute("value", "");
    option1.innerHTML = "--Choisissez une option--";

    option2.setAttribute("value", "titre");
    option2.innerHTML = "Titre";

    option3.setAttribute("value", "titre1");
    option3.innerHTML = "Titre 1";

    option4.setAttribute("value", "titre2");
    option4.innerHTML = "Titre 2";

    option5.setAttribute("value", "titre3");
    option5.innerHTML = "Titre 3";

    option6.setAttribute("value", "titre4");
    option6.innerHTML = "Titre 4";

    option7.setAttribute("value", "titre5");
    option7.innerHTML = "Titre 5";


    divSelect.appendChild(lblTexte);
    divSelect.appendChild(select);

    select.appendChild(option1);
    select.appendChild(option2);
    select.appendChild(option3);
    select.appendChild(option4);
    select.appendChild(option5);
    select.appendChild(option6);
    select.appendChild(option7);






}



function toolsImage()
{
    let divSelect  = document.getElementById("btnselect");
    let divBottom  = document.getElementById("bottom");

    while (divSelect.firstChild)
    {
        divSelect.removeChild(divSelect.firstChild);
    }

    divBottom.removeChild(divBottom.firstChild);
}



function toolsLien()
{
    let divSelect  = document.getElementById("btnselect");
    let divBottom  = document.getElementById("bottom");

    while (divSelect.firstChild)
    {
        divSelect.removeChild(divSelect.firstChild);
    }

    divBottom.removeChild(divBottom.firstChild);
}



function toolsCV()
{
    let divSelect  = document.getElementById("btnselect");
    let divBottom  = document.getElementById("bottom");

    while (divSelect.firstChild)
    {
        divSelect.removeChild(divSelect.firstChild);
    }

    divBottom.removeChild(divBottom.firstChild);
}
