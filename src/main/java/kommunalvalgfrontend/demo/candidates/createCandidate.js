
function createCandidate(){
    const candidateToCreate = {
        name:document.getElementById("create-candidate-name").value,
        politicalParty:document.getElementById("create-candidate-political-party").value
    }


    fetch("http://localhost:8080/candidates", {
        method: "POST",
        headers: {"Content-type": "application/json; charset=UTF-8"},
        body: JSON.stringify(candidateToCreate)
    })
        .then(response => response.json())
        .then(error => console.log(error));

}

document.getElementById("create-candidate-btn")
    .addEventListener("click", createCandidate);

function directToCandidate() {
    location.assign('./candidate.html');
}