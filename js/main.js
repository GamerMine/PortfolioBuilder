import {URL_BASE} from "./constants.js";
import {jsonToHTML} from "./elements/utils.js";

export function loginForm() {
    window.location.href = "session/loginForm.html";
}

export function registerForm() {
    window.location.href = "session/registerForm.html";
}

export function requestVerifyConnection() {
    const request = new XMLHttpRequest();

    request.open("GET", URL_BASE+"server/login.php?session=1", true);
    request.send();

    return request;
}

export function showAllPortfolio() {
    const request = new XMLHttpRequest();
    const portfolioList = document.getElementById("list-portfolio");

    request.open("GET", URL_BASE+"server/requestData.php?command=ALL_USER_PORTFOLIO");
    request.send();

    request.onreadystatechange = () => {
        if (request.readyState === 4) {
            const response = JSON.parse(request.response);

            for (const userHome of response.result) {
                portfolioList.appendChild(createPortfolioPreviewElement(userHome.name, userHome.surname, userHome.mail, userHome.homecontent));
            }
        }
    }

}

function moveToPortfolioView(mail) {
    const request = new XMLHttpRequest();
    request.open("GET", URL_BASE+"server/sendData.php?command=SET_LOCATION&location=homeContentIN"+mail);
    request.send();

    request.onreadystatechange = () => {
        if (request.readyState === 4) {
            window.location.href = "portfolio.html";
        }
    }
}

function createPortfolioPreviewElement(name, surname, mail, homeContent) {
    const article = document.createElement("article");
    const h5 = document.createElement("h5");
    const div = document.createElement("div");
    const embed = document.createElement("iframe");

    h5.onclick = () => {
        moveToPortfolioView(mail);

    }

    div.onclick = () => {
        moveToPortfolioView(mail);
    }

    article.classList.add("card-portfolio");
    h5.innerText = name + " " + surname;
    embed.src = "template.html";
    embed.scrolling = "no";

    embed.onload = () => {
        jsonToHTML(homeContent, embed.contentWindow.document.getElementById("content"));
    }

    article.appendChild(h5);
    article.appendChild(div);
    div.appendChild(embed);

    return article;
}

export function editPortfolio() {
    const request = requestVerifyConnection();
    request.onreadystatechange = () => {
        if (request.readyState === 4) {
            try {
                const response = JSON.parse(request.response);
                if (response.connected) {
                    window.location.href = "session/editor.html";
                } else {
                    loginForm();
                }
            } catch (e) {

            }
        }
    }
}

export function disconnect() {
    const request = new XMLHttpRequest();
    request.open("GET", URL_BASE+"server/disconnect.php");
    request.send();

    request.onreadystatechange = () => {
        if (request.readyState === 4) {
            window.location.href = "index.html";
        }
    }
}