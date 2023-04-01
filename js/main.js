import {URL_BASE} from "./constants.js";

export function loginForm() {
    window.location.href = "session/loginForm.html";
}

export function registerForm() {
    window.location.href = "session/registerForm.html";
}

function register() {

}

function createPortfolio() {

}

export function requestVerifyConnection() {
    const request = new XMLHttpRequest();

    request.open("GET", URL_BASE+"server/login.php?session=1", true);
    request.send();

    return request;
}

export function showAllPortfolio() {
    const TEST = "<body>\n" +
        "\t<header>\n" +
        "\t\t<h1>Portfolio Builder</h1>\n" +
        "\t\t<div id=\"btn-login\">\n" +
        "\t\t\t<button id=\"login\" type=\"button\">Connexion</button>\n" +
        "\t\t\t<button class=\"button\" id=\"register\" type=\"button\" onclick=\"registerForm()\">S'inscrire</button>\n" +
        "\t\t</div>\n" +
        "\t</header>\n" +
        "\n" +
        "\n" +
        "\t<main>\n" +
        "\t\t<h3>Liste des portfolio</h3>\n" +
        "\t\t<section id=\"list-portfolio\">\n" +
        "\n" +
        "\t\t\t<article class=\"card-portfolio\">\n" +
        "\t\t\t\t<h5>Portfolio de X</h5>\n" +
        "\t\t\t\t<div></div>\n" +
        "\t\t\t</article>\n" +
        "\n" +
        "\t\t\t<article class=\"card-portfolio\">\n" +
        "\t\t\t\t<h5>Portfolio de X</h5>\n" +
        "\t\t\t\t<div></div>\n" +
        "\t\t\t</article>\n" +
        "\n" +
        "\t\t\t<article class=\"card-portfolio\">\n" +
        "\t\t\t\t<h5>Portfolio de X</h5>\n" +
        "\t\t\t\t<div></div>\n" +
        "\t\t\t</article>\n" +
        "\n" +
        "\t\t\t<article class=\"card-portfolio\">\n" +
        "\t\t\t\t<h5>Portfolio de X</h5>\n" +
        "\t\t\t\t<div></div>\n" +
        "\t\t\t</article>\n" +
        "\n" +
        "\t\t\t<article class=\"card-portfolio\">\n" +
        "\t\t\t\t<h5>Portfolio de X</h5>\n" +
        "\t\t\t\t<div></div>\n" +
        "\t\t\t</article>\n" +
        "\t\t\t\n" +
        "\t\t</section>\n" +
        "\t\t<div class=\"right-position\">\n" +
        "\t\t\t<button id=\"create-portfolio\" type=\"button\" class=\"button\">Créer votre portfolio</button>\n" +
        "\t\t</div>\n" +
        "\t</main>\n" +
        "\n" +
        "\t<footer>\n" +
        "\t\t<p>\n" +
        "\t\t\t<img src=\"picture/Cc_by-nd_icon.svg\"/>\n" +
        "\t\t\tCD BY-ND\n" +
        "\t\t</p>\n" +
        "\t\tMaxime SAVARY - Louis LE CLÉAC'H - Elie BRION - Léo LANGLOIS\n" +
        "\t</footer>\n" +
        "</body>"
    const request = new XMLHttpRequest();
    const portfolioList = document.getElementById("list-portfolio");

    request.open("GET", URL_BASE+"server/requestData.php?command=ALL_USER_PORTFOLIO");
    request.send();

    request.onreadystatechange = () => {
        if (request.readyState === 4) {
            const response = JSON.parse(request.response);
            console.log(response);

            for (const userHome of response.result) {
                console.log(userHome);
            }
        }
    }

    const article = document.createElement("article");
    const h5 = document.createElement("h5");
    const div = document.createElement("div");

    article.classList.add("card-portfolio");
    h5.innerText = "Test";
    div.innerHTML = TEST;
    article.appendChild(h5);
    article.appendChild(div);
    portfolioList.appendChild(article);

}