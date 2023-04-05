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


    btnTxt .addEventListener("click", toolsText , false);
    btnImg .addEventListener("click", toolsImage, false);
    btnLink.addEventListener("click", toolsLien , false);
    btnCv  .addEventListener("click", toolsCV   , false);

    btnRetour.addEventListener("click", toolsBase, false);

}




let lblType = document.createElement("div");

let select      = document.createElement("select");
let titre       = document.createElement("option");
let titre1      = document.createElement("option");
let titre2      = document.createElement("option");
let titre3      = document.createElement("option");
let titre4      = document.createElement("option");
let titre5      = document.createElement("option");
let paragraphe  = document.createElement("option");

lblType.innerText = "Niveau de texte :";

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
    divBottom.appendChild(btnRetour2);

    btnRetour2.addEventListener("click", modifTools, false);


}



let lbl   = document.createElement("div");
let inputImage = document.createElement("input");

lbl.setAttribute("class", "lbl")
lbl.textContent = "Choissisez une image :";

inputImage.setAttribute("type", "file");
inputImage.setAttribute("id", "choose_img");
inputImage.setAttribute("name", "choose_img");
inputImage.setAttribute("accept", "image/png, image/jpeg");


let lblAlt     = document.createElement("div");
let inputAlt   = document.createElement("input");

lblAlt.setAttribute("class", "lbl")
lblAlt.textContent   = "Texte alternatif :";

inputAlt.setAttribute("type", "text");
inputAlt.setAttribute("id", "alt");
inputAlt.setAttribute("name", "alt");


let div1 = document.createElement("div");
let div2 = document.createElement("div");

div1.setAttribute("class", "divImage");
div2.setAttribute("class", "divImage");


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

    div1.appendChild(lbl);
    div1.appendChild(inputImage);
    div2.appendChild(lblAlt);
    div2.appendChild(inputAlt);

    divSelect.appendChild(div1);
    divSelect.appendChild(div2);

    divBottom.appendChild(btnAjout);
    divBottom.appendChild(btnRetour2);

    btnRetour2.addEventListener("click", modifTools, false);
}




let lblLien = document.createElement("div");

lblLien.setAttribute("class", "lbl")
lblLien.textContent = "Lien :";


let selectLien = document.createElement("select");

selectLien.setAttribute("id", "choose-link");
selectLien.setAttribute("name", "choose-link");

let optValue     = document.createElement("option");
let optInternet  = document.createElement("option");
let optPortfolio = document.createElement("option");

optValue.setAttribute("value", "");
optValue.innerHTML = "";

optInternet.setAttribute("value", "internet");
optInternet.innerHTML = "Internet";

optPortfolio.setAttribute("value", "portfolio");
optPortfolio.innerHTML = "Portfolio";

// input si Internet --------------------
let inputInternet = document.createElement("input");

inputInternet.setAttribute("type", "text");
inputInternet.setAttribute("id", "lien");
inputInternet.setAttribute("name", "lien");
inputInternet.setAttribute("placeholder", "http://");
// --------------------------------------

// select si Portfolio ------------------
let selectPortfolio = document.createElement("select");
let value = document.createElement("option");
let comp1 = document.createElement("option");
let comp2 = document.createElement("option");
let proj1 = document.createElement("option");
let proj2 = document.createElement("option");
let proj3 = document.createElement("option");

selectPortfolio.setAttribute("name", "text");
selectPortfolio.setAttribute("id", "text-select");

value.setAttribute("value", "value");
value.innerHTML = "----Value----";

comp1.setAttribute("value", "comp1");
comp1.innerHTML = "Compétence 1";

comp2.setAttribute("value", "comp2");
comp2.innerHTML = "Compétence 2";

proj1.setAttribute("value", "proj1");
proj1.innerHTML = "Projet 1";

proj2.setAttribute("value", "proj2");
proj2.innerHTML = "Projet 2";

proj3.setAttribute("value", "proj3");
proj3.innerHTML = "Projet 3";
// --------------------------------------

let divChoose = document.createElement("div");

divChoose.setAttribute("id", "divChoose");

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

    selectLien.appendChild(optValue);
    selectLien.appendChild(optInternet);
    selectLien.appendChild(optPortfolio);

    divSelect.appendChild(lblLien);
    divSelect.appendChild(selectLien);

    const selectElement = document.getElementById("choose-link");

    console.log("avant la fonction");

    selectElement.addEventListener('change', (event) => 
    {
        console.log("dans la fonction");

        divSelect.appendChild(divChoose);
    
        while(divChoose.firstChild)
        {
            divChoose.removeChild(divChoose.firstChild);
        }
      
        selectPortfolio.appendChild(value);
        selectPortfolio.appendChild(comp1);
        selectPortfolio.appendChild(comp2);
        selectPortfolio.appendChild(proj1);
        selectPortfolio.appendChild(proj2);
        selectPortfolio.appendChild(proj3);
        
        let text = selectElement.options[selectElement.selectedIndex].text;
        
        if (text === "Internet")
        {
            divChoose.appendChild(inputInternet);
        }
        else if (text === "Portfolio")
        {
            divChoose.appendChild(selectPortfolio);
        }

        divSelect.appendChild(lblTexte);
        divSelect.appendChild(inputTexte);
    
    });

  
    divBottom.appendChild(btnAjout);
    divBottom.appendChild(btnRetour2);

    btnRetour2.addEventListener("click", modifTools, false);
}

let lblCV = document.createElement("div");
let inputCV = document.createElement("input");

lblCV.setAttribute("class", "lbl")
lblCV.textContent = "Ajouter un CV :";

/*
<input type="file"
       id="choose-cv" name="choose-cv"
       accept="application/pdf">
*/
inputCV.setAttribute("type", "file");
inputCV.setAttribute("id", "choose-cv");
inputCV.setAttribute("name", "choose-cv");
inputCV.setAttribute("accept", "application/pdf");

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

    divSelect.appendChild(lblCV);
    divSelect.appendChild(inputCV);

    divBottom.appendChild(btnAjout);
    divBottom.appendChild(btnRetour2);

    btnRetour2.addEventListener("click", modifTools, false);

}