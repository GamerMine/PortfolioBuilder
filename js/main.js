const URL_BASE = "http://localhost.iut.univ-lehavre.fr/~sm211563/PortfolioBuilder/";

function loginForm() {
    window.location.href = "session/loginForm.html";
}

function registerForm() {
    window.location.href = "session/registerForm.html";
}

function register() {

}

function createPortfolio() {

}

function requestVerifyConnection() {
    const request = new XMLHttpRequest();

    request.open("GET", URL_BASE+"server/login.php?session=1", true);
    request.send();

    return request;
}