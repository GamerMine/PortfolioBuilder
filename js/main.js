import {URL_BASE} from "./constants.js";
import {jsonToPage, pageToHTML, request, requestText} from "./elements/utils.js";
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

    embed.onload = async () => {
        embed.contentWindow.document.getElementById("name").innerText = name + " " + surname;
        embed.contentWindow.document.getElementById("mail").innerText = mail;
        let page = new HTMLPage();
        jsonToPage(homeContent,page);
        await pageToHTML(page,embed.contentWindow.document.getElementById("content"));
        embed.onload = () => {};
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

export async function getPageContent(name) {
    const resp = await request("GET", URL_BASE + "server/requestData.php?command=GET_CONTENT&name="+ name +"&visibility=editor");

    try {
        const response = JSON.parse(resp);

        if (!response.connected) window.location.href = "index.html";

        return response.content;

    } catch (e) {

    }
}

if (document.getElementById("img-footer") != null) {
    document.getElementById("img-footer").onclick = showRights;
}


function showRights(){
    window.location.href = URL_BASE + "rights.html";
}

export async function showPortfolioInfo() {
    const resp = await request("GET", URL_BASE+"server/requestData.php?command=GET_LOCATION");
    try {
        const response = JSON.parse(resp);
        const result = response.result.split("IN");

        const dataResp = await request("GET", URL_BASE+"server/requestData.php?command=GET_CONTENT&name="+result[0]+"&mail="+result[1]);

        const dataResponse = JSON.parse(dataResp);

        const templateResp = await requestText("GET", "template.html");

        document.querySelector("body").innerHTML = templateResp;
        let page = new HTMLPage();
        jsonToPage(dataResponse.content,page);
        await pageToHTML(page,document.getElementById("content"))
        await setupUserInfoInPageView(result[1]);
        setupEventsInPortfolioView(result[1]);
    } catch (e) {
        console.log(e)
    }
}

export async function showPortfolioProjectList() {
    const resp = await request("GET", URL_BASE+"server/requestData.php?command=GET_LOCATION");
    try {
        const response = JSON.parse(resp);
        const result = response.result.split("IN");
        const templateResp = await requestText("GET", "templateProject.html");
        const respPageList = await request("GET", URL_BASE + "server/requestData.php?command=GET_PAGE_LIST&mail="+result[1]);
        const responsePageList = JSON.parse(respPageList);

        document.querySelector("body").innerHTML = templateResp;

        for (const project of responsePageList.project) {
            const btn = document.createElement("button");
            btn.innerText = "Projet " + project.id;
            btn.onclick = async () => {
                loadPage("Projet-"+project.id, result[1]);
            };
            document.getElementById("list-project").appendChild(btn);
        }
        await setupUserInfoInPageView(result[1]);
        setupEventsInPortfolioView(result[1]);
    } catch (e) {
        console.log(e);
    }
}

export async function showPortfolioSkillList() {
    const resp = await request("GET", URL_BASE+"server/requestData.php?command=GET_LOCATION");
    try {
        const response = JSON.parse(resp);
        const result = response.result.split("IN");
        const templateResp = await requestText("GET", "templateSkill.html");
        const respPageList = await request("GET", URL_BASE + "server/requestData.php?command=GET_PAGE_LIST&mail="+result[1]);
        const responsePageList = JSON.parse(respPageList);

        document.querySelector("body").innerHTML = templateResp;

        for (const skill of responsePageList.skill) {
            const btn = document.createElement("button");
            btn.innerText = "Competence " + skill.id;
            btn.onclick = async () => {
                loadPage("Competence-"+skill.id, result[1]);
            };
            document.getElementById("list-skill").appendChild(btn);
        }
        await setupUserInfoInPageView(result[1]);
        setupEventsInPortfolioView(result[1]);
    } catch (e) {
        console.log(e);
    }
}

export async function loadPage(name, mail) {
    await request("GET", URL_BASE+"server/sendData.php?command=SET_LOCATION&location="+ name +"IN"+mail);
    const resp = await request("GET", URL_BASE+"server/requestData.php?command=GET_LOCATION");
    try {
        const response = JSON.parse(resp);
        const result = response.result.split("IN");

        const dataResp = await request("GET", URL_BASE+"server/requestData.php?command=GET_CONTENT&name="+result[0]+"&mail="+result[1]);

        const dataResponse = JSON.parse(dataResp);

        const templateResp = await requestText("GET", "template.html");

        document.querySelector("body").innerHTML = templateResp;
        let page = new HTMLPage();
        jsonToPage(dataResponse.content,page);
        await pageToHTML(page,document.getElementById("content"))
        await setupUserInfoInPageView(result[1]);
        setupEventsInPortfolioView(result[1]);
    } catch (e) {
        console.log(e)
    }
}

export function test() {
    console.log("oui");
}

export function setupEventsInPortfolioView(mail) {
    document.getElementById("homeHeader").onclick = async () => {
        await request("GET", URL_BASE+"server/sendData.php?command=SET_LOCATION&location=homeContentIN"+mail);
        await showPortfolioInfo();
    }
    document.getElementById("projectHeader").onclick = async () => {
        await request("GET", URL_BASE+"server/sendData.php?command=SET_LOCATION&location=projectListIN"+mail);
        await showPortfolioProjectList();
    }
    document.getElementById("skillHeader").onclick = async () => {
        await request("GET", URL_BASE+"server/sendData.php?command=SET_LOCATION&location=skillListIN"+mail);
        await showPortfolioSkillList();
    }
    document.getElementById("aboutHeader").onclick = async () => {
        await request("GET", URL_BASE+"server/sendData.php?command=SET_LOCATION&location=aboutContentIN"+mail);
        await showPortfolioInfo();
    }
}

export async function setupUserInfoInPageView(m) {
    const user_info = await request("GET", URL_BASE + "server/requestData.php?command=GET_USER_INFO&mail="+m);
    const user_info_json = JSON.parse(user_info);

    const surname = user_info_json.info[0].surname;     //Get user's surname
    const name = user_info_json.info[0].name;           //Get user's name
    const mail = user_info_json.info[0].mail;           //Get user's mail

    document.getElementById("name").innerText = name + " " + surname;
    document.getElementById("mail").innerText = mail;
}