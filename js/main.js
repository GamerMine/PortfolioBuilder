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