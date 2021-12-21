const queryString = window.location.search;
const URLParams = new URLSearchParams(queryString);
const candidateId = URLParams.get("candidateId");

const tBodyElement = document.getElementById("update-candidate");


fetch("http://localhost:8080/candidates/" + candidateId)
    .then(response => response.json())
    .then(data => {
        createCandidateRow(data);
    })

function createCandidateRow(candidate){
    const candidateRow = document.createElement("div");
    candidateRow.id= candidate.id;

    tBodyElement.appendChild(candidateRow);
    constructCandidateRow(candidateRow, candidate);
}

function constructCandidateRow(candidateRow, candidate) {
    candidateRow.innerHTML = `
   
       <br>
       <p id="candidate-name"> Navn: ${(candidate.name)}</p>
       <br>
       <br>
       <p id="candidate-party"> Parti: ${(candidate.politicalParty)}</p>
       <br>
        <button id="update-button-${candidate.id}">Rediger</button> 
    `;
    document.getElementById(`update-button-${candidate.id}`)
        .addEventListener("click", () => {
            updateCandidate(candidate)

        });
}



function updateCandidate(candidate){

    const tableRowToUpdate = document.getElementById(candidate.id);

    tableRowToUpdate.innerHTML = `
    
    <td>
        <label>Navn</label>
        <input id="update-candidate-name-${candidate.id}" value="${escapeHTML(candidate.name)}">
    </td>
    <td>
    
    <select id="update-candidate-party-${candidate.id}" value="${escapeHTML(candidate.politicalParty)}">
        <option>A. Socialdemokratiet </option>
        <option>B. Radikale Venstre</option>
        <option>C. Det Konservative Folkeparti</option>
        <option>D. Nye Borgerlige</option>
        <option>F. SF - Socialistisk Folkeparti</option>
        <option>O. Dansk Folkeparti</option>
        <option>T. VallensbækListen</option>
        <option>Ø. Enhedslisten - De Rød-Grønne</option>
    </select>
        
    </td>
    <td>
        <button onclick="updateCandidateBackend(${candidate.id}), directCandidate()">✅</button>  
    </td>
    
    `;

    tBodyElement.appendChild(tableRowToUpdate);

}

function updateCandidateBackend(candidateId){

    const candidateRowToUpdate = document.getElementById(candidateId);

    const candidateToUpdate ={
        id: candidateId,
        name:document.getElementById(`update-candidate-name-${candidateId}`).value,
        politicalParty: document.getElementById(`update-candidate-party-${candidateId}`).value
    };

    fetch("http://localhost:8080/candidates/" + candidateId, {
        method:"PATCH",
        headers: {"Content-type": "application/json; charset=UTF-8"},
        body: JSON.stringify(candidateToUpdate)

    }) .then(response => {
        if(response.status === 200){
            updateCandidate(candidateRowToUpdate, candidateToUpdate)
        }
    });

}

function directCandidate() {
    location.assign('./Candidate.html')
}