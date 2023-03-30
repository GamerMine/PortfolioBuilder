const URL_BASE = "http://woody.iut.univ-lehavre.fr/~sm211563/PortfolioBuilder/"

function loginForm() {
    window.location.href = "../session/loginForm.html";
}

function registerForm() {
    window.location.href = "../session/registerForm.html";
}

function login() {
    const request = new XMLHttpRequest();
    const addressField = document.getElementById("mail");
    const passField    = document.getElementById("pass");

    request.open("POST", URL_BASE+"server/login.php?mail="+addressField.value+"&pass="+passField.value, true);
    request.setRequestHeader("Content-Type", "application/json");
    request.send();

    request.onreadystatechange = function () {
        if (request.readyState === 4) {
            const response = request.response;
            console.log(JSON.parse(response));
        }
    };

}

function register() {

}

function createPortfolio() {

}