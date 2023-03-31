import {URL_BASE} from "./constants";

const form = document.getElementById("form");
form.addEventListener("submit", (e) => {
    e.preventDefault();
});

const addressField = document.getElementById("mail");
const passField = document.getElementById("pass");

addressField.addEventListener("input", () => {
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(addressField.value)) {
        addressField.style.backgroundColor = "rgba(234,89,89,0.45)";
    } else {
        addressField.style.backgroundColor = "rgba(108,234,89,0.45)";
    }
});

passField;addEventListener("input", () => {
   if (passField.value === "") {
       passField.style.backgroundColor = "rgba(234,89,89,0.45)";
   } else {
       passField.style.backgroundColor = "rgba(108,234,89,0.45)";
   }
});

async function login() {
    const request   = new XMLHttpRequest();

    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(addressField.value)) return;
    if (passField.value === "") return;

    await request.open("POST", URL_BASE+"server/login.php?mail="+addressField.value+"&pass="+passField.value, true);
    await request.send();

    request.onreadystatechange = await function () {
        if (request.readyState === 4) {
            try {
                const response = JSON.parse(request.response);
                console.log(response);
                if (response.authenticate) {
                    console.log("Redirection");
                    window.location.href = "../index.html";
                } else {
                    // TODO: Wrong mail or password popup
                    alert("Addresse mail ou mot de passe incorrect");
                }
            } catch (e) {
                // TODO: Server communication error popup
                alert("Connexion au serveur impossible, retentez plus tard");
                console.log("Connexion impossible, rententez plus tard");
            }
        }
    };
}