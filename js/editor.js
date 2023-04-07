import {URL_BASE} from "./constants.js";
import {HTMLPage} from "./elements/htmlPage.js";
import {jsonToPage, pageToHTML, request, sendFile} from "./elements/utils.js";
import {Paragraph} from "./elements/paragraph.js";
import {Title} from "./elements/title.js";
import {Link} from "./elements/link.js";
import {PDFView} from "./elements/pdfView.js";
import {Picture} from "./elements/image.js";
import {getPageContent} from "./main.js";

let page = new HTMLPage();
const iframe = document.getElementById("portfolio-preview");

loadPortfolio()

async function loadPortfolio() {
    const resp = await request("GET", URL_BASE + "server/requestData.php?command=PORTFOLIO_EXIST");

    try {
        const response = JSON.parse(resp);

        if (!response.connected) window.location.href = "../index.html";

        if (response.exist) {
            await showPortfolioHome();
        } else {
            showInfoPopup();
        }
    } catch (e) {
        window.location.href = "../index.html";
        console.log(e);
    }
}

function showInfoPopup() {
    const popupContainer = document.getElementById("popup-container");
    const form = popupContainer.querySelector("form");

    popupContainer.style.display = "block";

    form.onsubmit = async (e) => {
        e.preventDefault();
        await submitInformation();
        popupContainer.style.display = "none";
        await showPortfolioHome();
    }
}

async function submitInformation() {
    const titleField = document.getElementById("title-field");
    const nameField = document.getElementById("name-field");
    const surnameField = document.getElementById("surname-field");

    if (titleField.value === "" || nameField.value === "" | surnameField.value === "") {
        // TODO: Popup field not filled
        return;
    }

    await request("GET", URL_BASE+"server/sendData.php?command=SEND_INFO&title="+titleField.value+"&name="+nameField.value+"&surname="+surnameField.value);
    console.log(URL_BASE+"server/sendData.php?command=SEND_INFO&title="+titleField.value+"&name="+nameField.value+"&surname="+surnameField.value);
}

async function showPortfolioHome() {
    const resp = await request("GET", URL_BASE + "server/requestData.php?command=GET_CONTENT&name=homecontent&visibility=editor");
    try {
        const response = JSON.parse(resp);

        if (!response.connected) window.location.href = "../index.html";

        document.getElementById("portfolio-preview").src = "../template.html";

        iframe.onload = async () => {
            const user_info = await request("GET", URL_BASE + "server/requestData.php?command=GET_USER_INFO");
            const user_info_json = JSON.parse(user_info);

            const surname = user_info_json.info[0].surname;     //Get user's surname
            const name = user_info_json.info[0].name;           //Get user's name
            const mail = user_info_json.info[0].mail;           //Get user's mail

            iframe.contentWindow.document.getElementById("name").innerText = name + " " + surname;
            iframe.contentWindow.document.getElementById("mail").innerText = mail;

            page.empty();
            jsonToPage(response.content, page);
            pageToHTML(page, iframe.contentWindow.document.getElementById("content"));
        }
    } catch (e) {
        console.log(e)
    }
}

async function showPortfolioProjectList() {
    const resp = await request("GET", URL_BASE + "server/requestData.php?command=GET_PAGE_LIST");
    try {
        const response = JSON.parse(resp);

        if (!response.connected) window.location.href = "index.html";

        document.getElementById("portfolio-preview").src = "../templateProject.html";

        iframe.onload = async () => {
            const user_info = await request("GET", URL_BASE + "server/requestData.php?command=GET_USER_INFO");
            const user_info_json = JSON.parse(user_info);

            const surname = user_info_json.info[0].surname;     //Get user's surname
            const name = user_info_json.info[0].name;           //Get user's name
            const mail = user_info_json.info[0].mail;           //Get user's mail

            iframe.contentWindow.document.getElementById("name").innerText = name + " " + surname;
            iframe.contentWindow.document.getElementById("mail").innerText = mail;

            for (const project of response.project) {
                const btn = document.createElement("button");
                btn.innerText = "Projet " + project.id;
                btn.onclick = async () => {
                    const content = await getPageContent("Projet-" + project.id);
                    console.log(content);
                    loadPage(content);
                };
                console.log(iframe.contentWindow.document.getElementById("list-project"));
                iframe.contentWindow.document.getElementById("list-project").appendChild(btn);
            }
            iframe.onload = () => {
            };
        }

    } catch (e) {

    }
}

function loadPage(content) {
    document.getElementById("portfolio-preview").src = "../template.html"
    iframe.onload = async () => {
        const user_info = await request("GET", URL_BASE + "server/requestData.php?command=GET_USER_INFO");
        const user_info_json = JSON.parse(user_info);

        const surname = user_info_json.info[0].surname;     //Get user's surname
        const name = user_info_json.info[0].name;           //Get user's name
        const mail = user_info_json.info[0].mail;           //Get user's mail

        iframe.contentWindow.document.getElementById("name").innerText = name + " " + surname;
        iframe.contentWindow.document.getElementById("mail").innerText = mail;

        page.empty();
        jsonToPage(content, page);
        pageToHTML(page, iframe.contentWindow.document.getElementById("content"));
        iframe.onload = () => {
        };
    }
}

let lblTitre = document.createElement("div");
let btnHome = document.createElement("button");
let btnProject = document.createElement("button");
let btnSkill = document.createElement("button");
let btnApropos = document.createElement("button");

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


let btnAjouterElement = document.createElement("button");

btnAjouterElement.setAttribute("class", "button");
btnAjouterElement.setAttribute("id", "btn-add");
btnAjouterElement.setAttribute("type", "button");

document.getElementById("img-tools").onclick = toolsBase;

function toolsBase() {
    const cursor = document.getElementById("cursor");

    cursor.style.left = "33px";
    cursor.style.right = "";

    let divSelect = document.getElementById("btnselect");
    let divBottom = document.getElementById("bottom");

    while (divSelect.firstChild) {
        divSelect.removeChild(divSelect.firstChild);
    }

    while (divBottom.firstChild) {
        divBottom.removeChild(divBottom.firstChild);
    }


    btnAjouterElement.innerHTML = "Ajouter élément";

    divSelect.appendChild(lblTitre);
    divSelect.appendChild(btnHome);
    divSelect.appendChild(btnProject);
    divSelect.appendChild(btnSkill);
    divSelect.appendChild(btnApropos);

    divBottom.appendChild(btnAjouterElement);


    document.getElementById("btn-add").addEventListener("click", modifTools, false);

    btnHome.addEventListener("click", () => {
        document.getElementById("portfolio-preview").src = "../template.html";
        toolsBase();
        showPortfolioHome();
    });



    btnProject.addEventListener("click", async () =>
    {
        document.getElementById("portfolio-preview").src = "../templateProject.html";

        while (divSelect.firstChild){divSelect.removeChild(divSelect.firstChild);}
        while (divBottom.firstChild){divBottom.removeChild(divBottom.firstChild);}

        divSelect.appendChild(lblTitre);
        divSelect.appendChild(btnHome);

        let btnAjouterProjet = document.createElement("button");
        let divListeProjet = document.createElement("div");
        let divNewButton = document.createElement("div");

        btnAjouterProjet.setAttribute("class", "buttonNew");
        btnAjouterProjet.setAttribute("id", "btn-add-projet");
        btnAjouterProjet.setAttribute("type", "button");
        btnAjouterProjet.innerHTML = "Nouveau";

        divNewButton.setAttribute("class", "divNewButton");
        divListeProjet.setAttribute("class", "divListe");


        let ulListProjet = document.createElement("ul");
        
        const resp = await request("GET", URL_BASE+"server/requestData.php?command=GET_PAGE_LIST");

        try {
            const response = JSON.parse(resp);

            if (!response.connected) window.location.href = "index.html";

            for (const pr of response.project) {
                let li = document.createElement("li");
                let btn = document.createElement("button");
                btn.value = "Projet-" + pr.id;
                btn.innerText = "Projet-" + pr.id;
                li.appendChild(btn);
                ulListProjet.appendChild(li);
            }
        } catch (e) {
            console.log(e);
        }

        divListeProjet.appendChild(btnProject);
        divListeProjet.appendChild(ulListProjet);

        divNewButton.appendChild(btnAjouterProjet);

        divSelect.appendChild(divListeProjet);
        divSelect.appendChild(divNewButton);


        divSelect.appendChild(btnSkill);
        divSelect.appendChild(btnApropos);
    });


    btnSkill.addEventListener("click", async () => {
        document.getElementById("portfolio-preview").src = "../templateSkill.html";

        while (divSelect.firstChild){divSelect.removeChild(divSelect.firstChild);}
        while (divBottom.firstChild){divBottom.removeChild(divBottom.firstChild);}

        divSelect.appendChild(lblTitre);
        divSelect.appendChild(btnHome);
        divSelect.appendChild(btnProject);

        let btnAjouterCompetence = document.createElement("button");
        let divListeCompetence = document.createElement("div");
        let divNewButton = document.createElement("div");

        btnAjouterCompetence.setAttribute("class", "buttonNew");
        btnAjouterCompetence.setAttribute("id", "btn-add-comp");
        btnAjouterCompetence.setAttribute("type", "button");
        btnAjouterCompetence.innerHTML = "Nouveau";

        divNewButton.setAttribute("class", "divNewButton");
        divListeCompetence.setAttribute("class", "divListe");


        let ulListCompetence = document.createElement("ul");

        const resp = await request("GET", URL_BASE+"server/requestData.php?command=GET_PAGE_LIST");

        try {
            const response = JSON.parse(resp);

            if (!response.connected) window.location.href = "index.html";

            for (const sk of response.skill) {
                let li = document.createElement("li");
                let btn = document.createElement("button");
                btn.value = "Competence-" + sk.id;
                btn.innerText = "Competence-" + sk.id;
                li.appendChild(btn);
                ulListCompetence.appendChild(li);
            }
        } catch (e) {
            console.log(e);
        }

        divListeCompetence.appendChild(btnSkill);
        divListeCompetence.appendChild(ulListCompetence);

        divNewButton.appendChild(btnAjouterCompetence);

        divSelect.appendChild(divListeCompetence);
        divSelect.appendChild(divNewButton);

        divSelect.appendChild(btnApropos);
    });


    btnApropos.addEventListener("click", () => {
        document.getElementById("portfolio-preview").src = "../templateAPropos.html";
        toolsBase();

    });
}

let lblAjout = document.createElement("div");
let btnTxt = document.createElement("button");
let btnImg = document.createElement("button");
let btnLink = document.createElement("button");
let btnCv = document.createElement("button");
let btnRetour = document.createElement("button");

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


function modifTools() {
    inputTexte.value = "";
    let divBtnSelect = document.getElementById("btnselect");
    let divBottom = document.getElementById("bottom");

    while (divBtnSelect.firstChild) {
        divBtnSelect.removeChild(divBtnSelect.firstChild);
    }

    while (divBottom.firstChild) {
        divBottom.removeChild(divBottom.firstChild);
    }



    divBtnSelect.appendChild(lblAjout);
    divBtnSelect.appendChild(btnTxt);
    divBtnSelect.appendChild(btnImg);
    divBtnSelect.appendChild(btnLink);
    divBtnSelect.appendChild(btnCv);

    divBottom.appendChild(btnRetour);

    btnRetour.addEventListener("click", toolsBase, false);

    btnTxt.addEventListener("click", toolsText, false);
    btnImg.addEventListener("click", toolsImage, false);
    btnLink.addEventListener("click", toolsLien, false);
    btnCv.addEventListener("click", toolsCV, false);

}

let lblType = document.createElement("div");

let select = document.createElement("select");
let titre = document.createElement("option");
let titre1 = document.createElement("option");
let titre2 = document.createElement("option");
let titre3 = document.createElement("option");
let titre4 = document.createElement("option");
let titre5 = document.createElement("option");
let paragraphe = document.createElement("option");

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


let btnAjoutText = document.createElement("button");
btnAjoutText.setAttribute("class", "button");
btnAjoutText.setAttribute("id", "btn-add");
btnAjoutText.setAttribute("type", "button");
btnAjoutText.innerHTML = "Ajouter Texte";

let btnRetour2 = document.createElement("button");

btnRetour2.setAttribute("class", "button");
btnRetour2.setAttribute("id", "btn-back");
btnRetour2.setAttribute("type", "button");
btnRetour2.innerHTML = "Retour";


function toolsText() {
    let divSelect = document.getElementById("btnselect");
    let divBottom = document.getElementById("bottom");

    while (divSelect.firstChild) {
        divSelect.removeChild(divSelect.firstChild);
    }

    while (divBottom.firstChild) {
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

    divBottom.appendChild(btnAjoutText);
    divBottom.appendChild(btnRetour2);

    btnRetour2.addEventListener("click", modifTools, false);
    btnAjoutText.addEventListener("click", () => {
        emptyIframe();
        if (select.value === "paragraphe") {
            page.addObject = new Paragraph(inputTexte.value);
            pageToHTML(page, iframe.contentWindow.document.getElementById("content"));
            inputTexte.value = "";
        } else {
            page.addObject = new Title(inputTexte.value, select.value);
            pageToHTML(page, iframe.contentWindow.document.getElementById("content"));
            inputTexte.value = "";
        }
        saveActualContent();
    }, false);
}


let lbl = document.createElement("div");
let inputImage = document.createElement("input");

lbl.setAttribute("class", "lbl")
lbl.textContent = "Choissisez une image (2MO MAX) :";

inputImage.setAttribute("type", "file");
inputImage.setAttribute("id", "choose_img");
inputImage.setAttribute("name", "choose_img");
inputImage.setAttribute("accept", "image/png, image/jpeg");


let lblAlt = document.createElement("div");
let inputAlt = document.createElement("input");

lblAlt.setAttribute("class", "lbl")
lblAlt.textContent = "Texte alternatif :";

inputAlt.setAttribute("type", "text");
inputAlt.setAttribute("id", "alt");
inputAlt.setAttribute("name", "alt");


let div1 = document.createElement("div");
let div2 = document.createElement("div");

let btnAjoutImage = document.createElement("button");
btnAjoutImage.setAttribute("class", "button");
btnAjoutImage.setAttribute("id", "btn-add");
btnAjoutImage.setAttribute("type", "button");
btnAjoutImage.innerHTML = "Ajouter Image";

function toolsImage() {
    let divSelect = document.getElementById("btnselect");
    let divBottom = document.getElementById("bottom");

    while (divSelect.firstChild) {
        divSelect.removeChild(divSelect.firstChild);
    }

    while (divBottom.firstChild) {
        divBottom.removeChild(divBottom.firstChild);
    }

    div1.appendChild(lbl);
    div1.appendChild(inputImage);
    div2.appendChild(lblAlt);
    div2.appendChild(inputAlt);

    divSelect.appendChild(div1);
    divSelect.appendChild(div2);

    divBottom.appendChild(btnAjoutImage);
    divBottom.appendChild(btnRetour2);

    btnRetour2.addEventListener("click", modifTools, false);
    btnAjoutImage.addEventListener("click", async () => {
        if (!inputImage.value == "") {
            const formData = new FormData();
            formData.append("file", document.getElementById("choose_img").files[0]);

            const resp = await sendFile(URL_BASE + "server/sendData.php?command=SAVE_FILE", formData);

            try {
                console.log(resp);
                const response = JSON.parse(resp);
                if (!response.connected) window.location.href = "index.html";

                emptyIframe();
                page.addObject = new Picture(URL_BASE + "server/" + response.link, inputAlt.value);
                pageToHTML(page, iframe.contentWindow.document.getElementById("content"));
                inputImage.value = "";
                inputAlt.value = "";
                await saveActualContent();
            } catch (e) {
                console.log(e);
            }
        } else {
            console.warn("No file selected"); //TODO : an error message box
        }
    }, false);
}


let lblLien = document.createElement("div");

lblLien.setAttribute("class", "lbl")
lblLien.textContent = "Lien :";


let selectLien = document.createElement("select");

selectLien.setAttribute("id", "choose-link");
selectLien.setAttribute("name", "choose-link");

let optValue = document.createElement("option");
let optInternet = document.createElement("option");
let optPortfolio = document.createElement("option");

optValue.setAttribute("value", "");
optValue.innerHTML = "";

optInternet.setAttribute("value", "internet");
optInternet.innerHTML = "Internet";

optPortfolio.setAttribute("value", "portfolio");
optPortfolio.innerHTML = "Portfolio";


let inputTexteLien = document.createElement("textarea");

inputTexteLien.setAttribute("id", "text-link");
inputTexteLien.setAttribute("name", "text-link");
inputTexteLien.setAttribute("rows", "10");
inputTexteLien.setAttribute("style", "resize: none;");


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

selectPortfolio.setAttribute("name", "text");
selectPortfolio.setAttribute("id", "text-select");

value.setAttribute("value", "value");
value.innerHTML = "----Value----";

// --------------------------------------

let divChoose = document.createElement("div");

divChoose.setAttribute("id", "divChoose");

let btnAjoutLien = document.createElement("button");
btnAjoutLien.setAttribute("class", "button");
btnAjoutLien.setAttribute("id", "btn-add");
btnAjoutLien.setAttribute("type", "button");
btnAjoutLien.innerHTML = "Ajouter Lien";


function toolsLien() {
    let divSelect = document.getElementById("btnselect");
    let divBottom = document.getElementById("bottom");

    while (divSelect.firstChild) {
        divSelect.removeChild(divSelect.firstChild);
    }

    while (divBottom.firstChild) {
        divBottom.removeChild(divBottom.firstChild);
    }

    selectLien.appendChild(optValue);
    selectLien.appendChild(optInternet);
    selectLien.appendChild(optPortfolio);

    divSelect.appendChild(lblLien);
    divSelect.appendChild(selectLien);

    const selectElement = document.getElementById("choose-link");

    let text = "";
    selectElement.addEventListener('change', async (event) => {

        divSelect.appendChild(lblLien);
        divSelect.appendChild(selectLien);
        divSelect.appendChild(divChoose);

        while (divChoose.firstChild) {
            divChoose.removeChild(divChoose.firstChild);
        }

        selectPortfolio.querySelectorAll("option").forEach(o => o.remove());

        selectPortfolio.appendChild(value);

        divSelect.appendChild(lblTexte);
        divSelect.appendChild(inputTexteLien);

        const resp = await request("GET", URL_BASE + "server/requestData.php?command=GET_PAGE_LIST");

        try {
            const response = JSON.parse(resp);

            if (!response.connected) window.location.href = "index.html";

            for (const sk of response.skill) {
                const option = document.createElement("option");
                option.value = "Competence-" + sk.id;
                option.innerText = "Competence-" + sk.id;
                selectPortfolio.appendChild(option);
            }
            for (const pr of response.project) {
                const option = document.createElement("option");
                option.value = "Projet-" + pr.id;
                option.innerText = "Projet-" + pr.id;
                selectPortfolio.appendChild(option);
            }
        } catch (e) {
            console.log(e);
        }

        text = selectElement.options[selectElement.selectedIndex].text;

        if (text === "Internet") {
            divChoose.appendChild(inputInternet);
        } else if (text === "Portfolio") {
            divChoose.appendChild(selectPortfolio);
        } else if (text === "") {
            while (divSelect.firstChild) {
                divSelect.removeChild(divSelect.firstChild);
            }
            divSelect.appendChild(lblLien);
            divSelect.appendChild(selectLien);
        }
    });


    divBottom.appendChild(btnAjoutLien);
    divBottom.appendChild(btnRetour2);

    btnRetour2.addEventListener("click", modifTools, false);
    btnAjoutLien.addEventListener("click", () => {
        emptyIframe();
        if (text === "Internet") {
            page.addObject = new Link(inputTexteLien.value, inputInternet.value);
            pageToHTML(page, iframe.contentWindow.document.getElementById("content"));
            console.log(inputTexteLien.value + inputInternet.value);
            inputInternet.value = "";
            inputTexteLien.value = "";
        } else if (text === "Portfolio") {
            page.addObject = new Link(inputTexte.value, "javascript:loadPage('" + selectPortfolio.options[selectPortfolio.selectedIndex].text + "');");
            pageToHTML(page, iframe.contentWindow.document.getElementById("content"));
        }
        saveActualContent();
    }, false)
}

let lblCV = document.createElement("div");
let inputCV = document.createElement("input");

lblCV.setAttribute("class", "lbl")
lblCV.textContent = "Ajouter un CV (2MO MAX) :";

inputCV.setAttribute("type", "file");
inputCV.setAttribute("id", "choose-cv");
inputCV.setAttribute("name", "choose-cv");
inputCV.setAttribute("accept", "application/pdf");

let btnAjoutCV = document.createElement("button");
btnAjoutCV.setAttribute("class", "button");
btnAjoutCV.setAttribute("id", "btn-add");
btnAjoutCV.setAttribute("type", "button");
btnAjoutCV.innerHTML = "Ajouter CV";

function toolsCV() {
    let divSelect = document.getElementById("btnselect");
    let divBottom = document.getElementById("bottom");

    while (divSelect.firstChild) {
        divSelect.removeChild(divSelect.firstChild);
    }


    while (divBottom.firstChild) {
        divBottom.removeChild(divBottom.firstChild);
    }

    divSelect.appendChild(lblCV);
    divSelect.appendChild(inputCV);

    divBottom.appendChild(btnAjoutCV);
    divBottom.appendChild(btnRetour2);

    btnRetour2.addEventListener("click", modifTools, false);
    btnAjoutCV.addEventListener("click", async () => {
        if (document.getElementById("choose-cv").files.length > 0) {
            const formData = new FormData();
            formData.append("file", document.getElementById("choose-cv").files[0]);

            const resp = await sendFile(URL_BASE + "server/sendData.php?command=SAVE_FILE", formData);

            try {
                const response = JSON.parse(resp);
                if (!response.connected) window.location.href = "index.html";

                emptyIframe();
                page.addObject = new PDFView(URL_BASE + "server/" + response.link);
                console.log(URL_BASE + "server/" + response.link);
                pageToHTML(page, iframe.contentWindow.document.getElementById("content"));
                inputCV.value = "";
                let dataJson = JSON.stringify(page);
                await request("GET", URL_BASE + "server/sendData.php?command=SEND_CONTENT&name=homecontent&content=" + dataJson);
                await saveActualContent();
            } catch (e) {
                console.log(e);
            }
        } else {
            console.warn("No file selected"); //TODO: an error message popup
        }
    }, false);
}

function emptyIframe() {
    let iframe_to_change = iframe.contentWindow.document.getElementById("content")
    while (iframe_to_change.firstChild) {
        iframe_to_change.removeChild(iframe_to_change.lastChild);
    }
}
async function saveActualContent()
{
    let dataJson = JSON.stringify(page);
    await request("GET", URL_BASE + "server/sendData.php?command=SEND_CONTENT&name=homecontent&content=" + dataJson);
}
