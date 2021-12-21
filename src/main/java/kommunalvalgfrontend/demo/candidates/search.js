const tBodyElementSearch = document.getElementById("candidate-tbody");




fetch("http://localhost:8080/candidates")
    .then(response => response.json())
    .then(data => {
        parties = data;
        searchParties = parties;
        parties.map(searchForParties);
    });


function searchForParties(){
    const selectedParty = document.getElementById("search-candidate-dropdown").value;
    tBodyElementSearch.innerHTML = "";

    if(selectedParty === "Alle"){
        searchParties = parties;
        parties.map(createCandidateTableRow)
    } else {
        searchParties = parties.filter(party => party.status === selectedParty);
        searchParties.map(createCandidateOverview);

    }

}
document.getElementById("search-party").addEventListener("click", searchForParties);