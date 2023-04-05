import { URL_BASE } from "./constants.js";
import { request } from "./elements/utils.js";

const form = document.getElementById("form");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    register();
});

let addressField = document.getElementById("mail");
const passField    = document.getElementById("pass");
const verifPassField = document.getElementById("verifPass");


addressField.addEventListener("input", () => {
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(addressField.value)) {
        addressField.style.backgroundColor = "rgba(234,89,89,0.45)";
    } else {
        addressField.style.backgroundColor = "rgba(108,234,89,0.45)";
    }
});

passField.addEventListener("input", () => {
    if (passField.value === "" || passField.value !== verifPassField.value) {
        passField.style.backgroundColor = "rgba(234,89,89,0.45)";
        verifPassField.style.backgroundColor = "rgba(234,89,89,0.45)";
    } else {
        passField.style.backgroundColor = "rgba(108,234,89,0.45)";
        verifPassField.style.backgroundColor = "rgba(108,234,89,0.45)";
    }
});

verifPassField.addEventListener("input",() => {
    if (verifPassField.value === "" || passField.value !== verifPassField.value) {
        verifPassField.style.backgroundColor = "rgba(234,89,89,0.45)";
    } else {
        verifPassField.style.backgroundColor = "rgba(108,234,89,0.45)";
        passField.style.backgroundColor = "rgba(108,234,89,0.45)";
    }
})

async function register() {

    if(document.getElementById("warn") != null) document.getElementById("warn").remove();

    const warn = document.createElement("p");
    warn.classList.add("warn");
    warn.id = "warn";

    // Vérification du mail
    if((!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(addressField.value)))
    {
        if(document.getElementById("warn") != null) document.getElementById("warn").remove();
        warn.innerText = "Le mail ne correspond pas";
        document.getElementById("form").firstChild.after(warn);
        return;
    }

    // Vérification du mot de passe non vide
    if(passField.length===0 || passField.value === " ")
    {
        if(document.getElementById("warn") != null) document.getElementById("warn").remove();

        warn.innerText = "Le mot de passe doit contenir au moins un caractère";
        document.getElementById("form").firstChild.after(warn);
        return;
    }

    // Vérification des deux mots de passes différents
    if(passField.value !== verifPassField.value) {
        if(document.getElementById("warn") != null) document.getElementById("warn").remove();
        warn.innerText = "Les mots de passe ne correspondent pas !";
        document.getElementById("form").firstChild.after(warn);
        return;
    }


    const resp = await request("POST", URL_BASE+"server/register.php?mail="+addressField.value+"&pass="+passField.value+"&verifPass=" +verifPassField.value, true);
    try {
        const response = JSON.parse(resp);
        if (response.authenticate) {
            window.location.href = "../index.html";
        } else {
            warn.innerText = "Il existe déjà un compte associé à cette adresse mail !";
            document.getElementById("form").firstChild.after(warn);
        }
    } catch (e) {
        warn.innerText = "Une erreur serveur est survenu !\nVeuillez rééssayer plus tard !";
        document.getElementById("form").firstChild.after(warn);
    }
}

document.getElementById("btn-vision").onclick = vision;
document.getElementById("btn-vision2").onclick = vision2;

function vision() {
    const pass = document.getElementById("pass");
    console.log("visible");
    if (pass.type === "password") {
        pass.type = "text";
    } else {
        pass.type = "password";
    }
}

function vision2() {
    const pass = document.getElementById("verifPass");
    console.log("visible");
    if (pass.type === "password") {
        pass.type = "text";
    } else {
        pass.type = "password";
    }
}