import {URL_BASE} from "./constants.js";

const form = document.getElementById("form");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    login();
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

    if(document.getElementById("warn") != null) document.getElementById("warn").remove();

    const warn = document.createElement("p");
    warn.classList.add("warn");
    warn.id = "warn";

    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(addressField.value)) return;
    if (passField.value === "") return;

    await request.open("POST", URL_BASE+"server/login.php?mail="+addressField.value+"&pass="+passField.value, true);
    await request.send();

    request.onreadystatechange = await function () {
        if (request.readyState === 4) {
            try {
                const response = JSON.parse(request.response);
                if (response.authenticate) {
                    window.location.href = "../index.html";
                } else {
                    warn.innerText = "Identifiant ou mot de passe incorrect !";
                    document.getElementById("form").firstChild.after(warn);
                }
            } catch (e) {
                warn.innerText = "Une erreur serveur est survenu !\nVeuillez rééssayer plus tard !";
                document.getElementById("form").firstChild.after(warn);
            }
        }
    };
}

document.getElementById("btn-vision").onclick = vision;

function vision(){
    const pass = document.getElementById("pass");
    console.log("visible");
    if(pass.type === "password"){
        pass.type = "text";
    }else{
        pass.type = "password";
    }
}