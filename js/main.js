import {URL_BASE} from "./constants.js";
import {jsonToPage, pageToHTML, request} from "./elements/utils.js";
import {HTMLPage} from "./elements/htmlPage.js";

export function loginForm() {
    window.location.href = "session/loginForm.html";
}

export function registerForm() {
    window.location.href = "session/registerForm.html";
}

export async function requestVerifyConnection() {
    return await request("GET", URL_BASE + "server/login.php?session=1", true);
}

export async function showAllPortfolio() {
    const portfolioList = document.getElementById("list-portfolio");
    const resp = await request("GET", URL_BASE+"server/requestData.php?command=ALL_USER_PORTFOLIO");
    const response = JSON.parse(resp);

    for (const userHome of response.result) {
        portfolioList.appendChild(await createPortfolioPreviewElement(userHome.name, userHome.surname, userHome.mail, userHome.homecontent));
    }

    if (portfolioList.firstChild == null){
        const message = document.createElement("h2");
        message.textContent = "Il n'y a aucun portfolio !";
        portfolioList.appendChild(message);
    }
}

async function moveToPortfolioView(mail) {
    await request("GET", URL_BASE+"server/sendData.php?command=SET_LOCATION&location=homeContentIN"+mail);

    window.location.href = "portfolio.html";
}

async function createPortfolioPreviewElement(name, surname, mail, homeContent) {
    const article = document.createElement("article");
    const h5 = document.createElement("h5");
    const div = document.createElement("div");
    const embed = document.createElement("iframe");

    h5.onclick = async () => {
        await moveToPortfolioView(mail);

    }

    div.onclick = async () => {
        await moveToPortfolioView(mail);
    }

    article.classList.add("card-portfolio");
    h5.innerText = name + " " + surname;
    embed.src = "template.html";
    embed.scrolling = "no";

    embed.onload = () => {
        embed.contentWindow.document.getElementById("name").innerText = name + " " + surname;
        embed.contentWindow.document.getElementById("mail").innerText = mail;
        let page = new HTMLPage();
        jsonToPage(homeContent,page);
        pageToHTML(page,embed.contentWindow.document.getElementById("content"))
    }

    article.appendChild(h5);
    article.appendChild(div);
    div.appendChild(embed);

    return article;
}

export async function editPortfolio() {
    const resp = await requestVerifyConnection();
    try {
        const response = JSON.parse(resp);
        if (response.connected) {
            window.location.href = "session/editor.html";
        } else {
            loginForm();
        }
    } catch (e) {}
}

export async function disconnect() {
    await request("GET", URL_BASE+"server/disconnect.php");

    window.location.href = "index.html";
}