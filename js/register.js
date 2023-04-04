import {URL_BASE} from "./constants.js";

const form = document.getElementById("form");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    register();
});

async function register() {
    const request = new XMLHttpRequest();
    let addressField = document.getElementById("mail");
    const passField    = document.getElementById("pass");
    const verifPassField = document.getElementById("verifPass");

    if(document.getElementById("warn") != null) document.getElementById("warn").remove();

    const warn = document.createElement("p");
    warn.classList.add("warn");
    warn.id = "warn";


    console.log(document.getElementById("pass").innerText);
    console.log(document.getElementById("verifPass").innerText);

    if(document.getElementById("pass").value !== document.getElementById("verifPass").value) {
        console.log('ça marche');
        warn.innerText = "Les mots de passe ne correspondent pas !";
        document.getElementById("form").firstChild.after(warn);
        return;
    }

    await request.open("POST", URL_BASE+"server/register.php?mail="+addressField.value+"&pass="+passField.value+"&verifPass=" +verifPassField.value, true);
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
                    warn.innerText = "Il existe déjà un compte associé à cette adresse mail !";
                    document.getElementById("form").firstChild.after(warn);
                }
            } catch (e) {
                warn.innerText = "Un problème est survenu du coté serveur !";
                document.getElementById("form").firstChild.after(warn);
                console.log("Connexion impossible, rententez plus tard");
            }
        }
    };
}