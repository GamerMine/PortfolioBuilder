const URL_BASE = "http://localhost:63342/PortfolioBuilder/"

const form = document.getElementById("form");
form.addEventListener("submit", (e) => {
    e.preventDefault();
});

async function login() {
    console.log("COUCOU");
    const request = new XMLHttpRequest();
    let addressField = document.getElementById("mail");
    const passField    = document.getElementById("pass");

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
                }
            } catch (e) {
                // TODO: Server communication error popup
                console.log("Connexion impossible, rententez plus tard");
            }
        }
    };
}