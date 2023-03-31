const URL_BASE = "http://localhost.iut.univ-lehavre.fr/~sm211563/PortfolioBuilder/";

const form = document.getElementById("form");
form.addEventListener("submit", (e) => {
    e.preventDefault();
});

async function register() {
    const request = new XMLHttpRequest();
    let addressField = document.getElementById("mail");
    const passField    = document.getElementById("pass");
    const verifPassField = document.getElementById("verifPass");

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
                    // TODO: Wrong mail or password popup
                }
            } catch (e) {
                // TODO: Server communication error popup
                console.log("Connexion impossible, rententez plus tard");
            }
        }
    };
}