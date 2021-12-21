let parties;
let searchParties;
const tBodyElement = document.getElementById("candidate-tbody");


fetch("http://localhost:8080/candidates")
    .then(response => response.json())
    .then(data => {
        parties = data;
        searchParties = parties;
        parties.map(createCandidateTableRow);
    });


function createCandidateTableRow(candidate){
    const candidateTableRow = document.createElement("tr");
    candidateTableRow.id= candidate.id;

    tBodyElement.appendChild(candidateTableRow);
    createCandidateOverview(candidateTableRow, candidate)
}


function createCandidateOverview(candidateTableRow, candidate){
    candidateTableRow.innerHTML= `
    
    <td id="candidate-name">${(candidate.name)}</td>
    <td id="candidate-party">${(candidate.politicalParty)}</td>
    
    <td><button id="edit-candidate-"${candidate.id} onclick="directToUpdateCandidate(${candidate.id})">🖊️</button></td>
    <td><button onclick="confirmDelete(${candidate.id})">❌</button></td>
   
    `;

}


function searchForParties(){
    const selectedParty = document.getElementById("search-candidate-dropdown").value;
    tBodyElement.innerHTML = "";

    if(selectedParty === "Alle"){
        searchParties = parties;
        parties.map(createCandidateTableRow)
    } else {
        searchParties = parties.filter(party => party.status === selectedParty);
        searchParties.map(createCandidateTableRow);
    }

}
document.getElementById("search-party").addEventListener("click", searchForParties);



function directToUpdateCandidate(candidateId) {
    location.assign('./updateCandidate.html?candidateId=' + candidateId)
}



function deleteCandidate(candidateId) {
    fetch("http://localhost:8080/candidates/" + candidateId, {
        method: "DELETE"
    }).then(response => {
        if (response.status === 200) {
            document.getElementById(candidateId).remove();
        } else {
            console.log(response.status);
        }
    });
}

function confirmDelete(candidateId) {
    if (confirm("Er du sikker på du vil slette?")) {
        deleteCandidate(candidateId);
    }

    location.assign('./candidate.html');
}