
const element = document.getElementById("vote-tbody");

fetch("http://localhost:8080/votes")
    .then(response => response.json())
    .then(data => {
        data.map(createVoteTableRow)
    });

function createVoteTableRow(vote){
    const voteTableRow = document.createElement("tr");
    voteTableRow.id=vote.id;

    element.appendChild(voteTableRow);
    createVoteOverview(voteTableRow, vote);
}

function createVoteOverview(voteTableRow, vote){
    voteTableRow.innerHTML = `
    
    <td id="vote-partie">${vote.politicalParty}</td>
    <td id="vote-votes">${vote.votes}</td>
    
    `
}

document.getElementById("votes").addEventListener("click", directToVotes);

function directToVotes(){
    location.assign('../votes/votes.html')
}

function directToCandidate(){
    location.assign('../candidates/candidate.html')
}