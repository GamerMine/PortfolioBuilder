import {URL_BASE} from "./constants.js";
import {jsonToHTML} from "./elements/utils.js";

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
                console.log(e);
            }
        }
    }
}

function showPortfolioHome() {
    const request = new XMLHttpRequest();

    request.open("GET", URL_BASE+"server/requestData.php?command=GET_CONTENT&name=homecontent&visibility=editor");
    request.send();

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


let lblType = document.createElement("div");

let select      = document.createElement("select");
let titre       = document.createElement("option");
let titre1      = document.createElement("option");
let titre2      = document.createElement("option");
let titre3      = document.createElement("option");
let titre4      = document.createElement("option");
let titre5      = document.createElement("option");
let paragraphe  = document.createElement("option");

lblType.innerText = "Sélectionner un élément à ajouter :";

select.setAttribute("name", "text");
select.setAttribute("id", "text-select");

titre.setAttribute("value", "titre");
titre.innerHTML = "Titre";

titre1.setAttribute("value", "titre1");
titre1.innerHTML = "Titre 1";

titre2.setAttribute("value", "titre2");
titre2.innerHTML = "Titre 2";

titre3.setAttribute("value", "titre3");
titre3.innerHTML = "Titre 3";

titre4.setAttribute("value", "titre4");
titre4.innerHTML = "Titre 4";

titre5.setAttribute("value", "titre5");
titre5.innerHTML = "Titre 5";

paragraphe.setAttribute("value", "paragraphe");
paragraphe.innerHTML = "Paragraphe";

let lblTexte = document.createElement("div");
let inputTexte = document.createElement("textarea");

inputTexte.setAttribute("id", "text-input");
inputTexte.setAttribute("name", "text-input");
inputTexte.setAttribute("rows", "10");
inputTexte.setAttribute("style", "resize: none;");

lblTexte.innerText = "Texte :";


let btnAjout = document.createElement("button");

btnAjout.setAttribute("class", "button");
btnAjout.setAttribute("id", "btn-add");
btnAjout.setAttribute("type", "button");
btnAjout.innerHTML = "Ajouter";



function toolsText()
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

    select.appendChild(titre);
    select.appendChild(titre1);
    select.appendChild(titre2);
    select.appendChild(titre3);
    select.appendChild(titre4);
    select.appendChild(titre5);
    select.appendChild(paragraphe);

    divSelect.appendChild(lblType);
    divSelect.appendChild(select);
    divSelect.appendChild(lblTexte);
    divSelect.appendChild(inputTexte);

    divBottom.appendChild(btnAjout);
    divBottom.appendChild(btnRetour);

    btnRetour.addEventListener("click", modifTools, false);


}


/*
<label for="image">Choissisez une image :</label>

<input type="file" id="choose_img" name="choose_img" accept="image/png, image/jpeg">

<label for="alt">Texte alternatif :</label>

<input type="text" id="alt" name="alt">

<button class="button" id="btn-add" type="button">Ajouter</button>
*/
function toolsImage()
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

    let lblImage   = document.createElement("div");
    let inputImage = document.createElement("input");

    lblImage.textContent = "Choissisez une image :";
    lblAlt.textContent   = "Texte alternatif :";

    inputImage.setAttribute("type", "file");
    inputImage.setAttribute("id", "choose_img");
    inputImage.setAttribute("name", "choose_img");
    inputImage.setAttribute("accept", "image/png, image/jpeg");


    let lblAlt     = document.createElement("div");
    let inputAlt   = document.createElement("input");

    inputAlt.setAttribute("type", "text");
    inputAlt.setAttribute("id", "alt");
    inputAlt.setAttribute("name", "alt");



    divSelect.appendChild(lblImage);
    divSelect.appendChild(inputImage);

    divSelect.appendChild(lblAlt);
    divSelect.appendChild(inputAlt);


    let btnAjouter = document.createElement("button");

    btnAjouter.setAttribute("class", "button");
    btnAjouter.setAttribute("id", "btn-add");
    btnAjouter.setAttribute("type", "button");
    btnAjouter.textContent = "Ajouter";
    

    divBottom.appendChild(btnAjouter);




}



function toolsLien()
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




}



function toolsCV()
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




}