


document.getElementById("img-settings").onclick = settingsGeneraux;



let lblStyleG = document.createElement("div");
lblStyleG.innerHTML = "Style Général";

let btnQuitter = document.createElement("button");

btnQuitter.setAttribute("class", "button");
btnQuitter.setAttribute("id", "btn-quitter");
btnQuitter.setAttribute("type", "button");   
btnQuitter.innerHTML = "Quitter"; 


function settingsGeneraux()
{
    const cursor = document.getElementById("cursor");

    cursor.style.left = "";
    cursor.style.right = "26px";

    let divSelect  = document.getElementById("btnselect");
    let divBottom  = document.getElementById("bottom");

    while (divSelect.firstChild)
    {
        divSelect.removeChild(divSelect.firstChild);
    }

    while (divBottom.firstChild)
    {
        divBottom.removeChild(divBottom.firstChild);
    }

    divSelect.appendChild(lblStyleG);
    divSelect.appendChild(btnQuitter);

    btnQuitter.addEventListener('click', (event) => 
    {
        window.location.href = "../index.html";
    });

}   