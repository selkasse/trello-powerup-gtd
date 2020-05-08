const t = TrelloPowerUp.iframe();

// get the member (user) ID
async function getMemberId() {

    let response = await fetch('https://api.trello.com/1/members/me?key=41ae5bff41af5eac3f32ad7a4daab49e&token=5e71d684035b882896f8ecfc32de15dee8c64b0e73b8c965609c3c7473f47661');
    let memberResponse = await response.json();
    return memberResponse.id;

}

// get the boards that belong to the user
async function getMemberBoards() {
    const memberId = await getMemberId();

    let boardsResponse = await fetch(`https://api.trello.com/1/members/${memberId}/boards?key=41ae5bff41af5eac3f32ad7a4daab49e&token=5e71d684035b882896f8ecfc32de15dee8c64b0e73b8c965609c3c7473f47661`);
    let boardsJSON = await boardsResponse.json();
    // console.log(boardsJSON);
    // return boardsJSON;
    let boards = [];
    for(board in boardsJSON){
        const obj = {
            id: boardsJSON[board].id,
            name: boardsJSON[board].name
        };
        boards.push(obj);
    
    }
    return boards;
}

async function checkIfEnabled(id){
    let response = await fetch(`https://api.trello.com/1/boards/${id}/boardPlugins?key=41ae5bff41af5eac3f32ad7a4daab49e&token=5e71d684035b882896f8ecfc32de15dee8c64b0e73b8c965609c3c7473f47661`)
    let powerupsJSON = await response.json();
    for(powerup in powerupsJSON){
        if (powerupsJSON[powerup].idPlugin === '5eb0ba3ec071f670fcd8b0dd') return true;
    }
    return false;
}


// return boards JSON from getMemberBoards
// break out boardNames into a new function: getBoardNames (not async)
// make a new function, getBoardPowerups(board)

// add the boards to the dropdown when master.html renders
t.render(async function(){
    const boards = await getMemberBoards();
    // console.log(boards);
    // const boardNames = getBoardNames(boards);
    const select = document.getElementById("masterBoard");
    for (board in boards){
        // call getBoardPowerUps, passing the board ID
        // only create an option if the Trello GTD powerup is enabled on the board
        const powerupEnabled = await checkIfEnabled(boards[board].id);
        // if(boards[board].name === 'GTD Powerup Test'){

        //     console.log(boards[board].name);
        //     console.log(powerupEnabled);
        // }
        if(enabled){

            const option = document.createElement("option");
            option.text = boards[board].name;
            select.add(option);
        }
    }
    t.sizeTo('#master').done(); 
})

// exports.getMemberBoards = getMemberBoards;




