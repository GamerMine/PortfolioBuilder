import {URL_BASE} from "./constants.js";
import {HTMLPage} from "./elements/htmlPage.js";
import {jsonToHTML, request} from "./elements/utils.js";
import {Paragraph} from "./elements/paragraph.js";
import {Title} from "./elements/title.js";

let page = new HTMLPage();
const iframe = document.getElementById("portfolio-preview");

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
    const resp = await request("GET", URL_BASE + "server/requestData.php?command=GET_CONTENT&name=homecontent&visibility=editor");
    try {
        const response = JSON.parse(resp);

        if (!response.connected) window.location.href = "../index.html";

        document.getElementById("portfolio-preview").src = "../template.html";


        const user_info = await request("GET", URL_BASE + "server/requestData.php?command=GET_USER_INFO");
        const user_info_json = JSON.parse(user_info);

        iframe.onload = () => {
            const surname = user_info_json.info[0].surname;     //Get user's surname
            const name = user_info_json.info[0].name;           //Get user's name
            const mail = user_info_json.info[0].mail;           //Get user's mail

            iframe.contentWindow.document.getElementById("name").innerText = name + " " + surname;
            iframe.contentWindow.document.getElementById("mail").innerText = mail;

            jsonToHTML(response.content, iframe.contentWindow.document.getElementById("content"));
        }
    } catch (e) {
        console.log(e)
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

titre.setAttribute("value", "1");
titre.innerHTML = "Titre";

titre1.setAttribute("value", "2");
titre1.innerHTML = "Titre 1";

titre2.setAttribute("value", "3");
titre2.innerHTML = "Titre 2";

titre3.setAttribute("value", "4");
titre3.innerHTML = "Titre 3";

titre4.setAttribute("value", "5");
titre4.innerHTML = "Titre 4";

titre5.setAttribute("value", "6");
titre5.innerHTML= "Titre 5";

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

let btnRetour2 = document.createElement("button");

btnRetour2.setAttribute("class", "button");
btnRetour2.setAttribute("id", "btn-back");
btnRetour2.setAttribute("type", "button");
btnRetour2.innerHTML = "Retour";


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
    btnAjout.addEventListener("click",() =>
    {
        page.empty();
        if(select.value === "paragraphe")
        {
            page.addObject = new Paragraph(inputTexte.value);
            jsonToHTML(JSON.stringify(page), iframe.contentWindow.document.getElementById("content"));
            inputTexte.value="";
        }
        else
        {
            page.addObject = new Title(inputTexte.value,select.value);
            jsonToHTML(JSON.stringify(page), iframe.contentWindow.document.getElementById("content"));
            inputTexte.value="";
        }
    },false);
    btnRetour2.addEventListener("click", modifTools, false);
    btnAjout.addEventListener("click",() =>
    {
        page.empty();
        console.log(page.objectList.length);
        if(select.value === "paragraphe")
        {
            page.addObject = new Paragraph(inputTexte.value);
            jsonToHTML(JSON.stringify(page), iframe.contentWindow.document.getElementById("content"));
        }
        else
        {
            page.addObject = new Title(inputTexte.value,select.value);
            jsonToHTML(JSON.stringify(page), iframe.contentWindow.document.getElementById("content"));
        }
    },false);


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

let lbl   = document.createElement("div");
let inputImage = document.createElement("input");

    lblImage.setAttribute("class", "lblImage")
    lblImage.textContent = "Choissisez une image :";

    inputImage.setAttribute("type", "file");
    inputImage.setAttribute("id", "choose_img");
    inputImage.setAttribute("name", "choose_img");
    inputImage.setAttribute("accept", "image/png, image/jpeg");


    let lblAlt     = document.createElement("div");
    let inputAlt   = document.createElement("input");

    lblAlt.setAttribute("class", "lblImage")


    lblAlt.textContent   = "Texte alternatif :";

    inputAlt.setAttribute("type", "text");
    inputAlt.setAttribute("id", "alt");
    inputAlt.setAttribute("name", "alt");


    let div1 = document.createElement("div");
    let div2 = document.createElement("div");

    div1.setAttribute("class", "divImage");
    div2.setAttribute("class", "divImage");

    div1.appendChild(lblImage);
    div1.appendChild(inputImage);

    div2.appendChild(lblAlt);
    div2.appendChild(inputAlt);

    divSelect.appendChild(div1);
    divSelect.appendChild(div2);



    let btnAjouter = document.createElement("button");

    btnAjouter.setAttribute("class", "button");
    btnAjouter.setAttribute("id", "btn-add");
    btnAjouter.setAttribute("type", "button");
    btnAjouter.textContent = "Ajouter";


    divBottom.appendChild(btnAjouter);
    divBottom.appendChild(btnRetour);

    btnRetour.addEventListener("click", modifTools, false);


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