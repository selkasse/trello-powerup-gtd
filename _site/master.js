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
    const boardNames = boardsJSON.map(board => board.name)
    return boardNames;
}

const select = document.querySelector("masterBoard");
const boards = getMemberBoards();
let masterHTML;

for (board in boards) {
    masterHTML += `<option value=${boards[board]}>${boards[board]}</option>`;
}

// function masterBoardHTML() {
//     return boards.map(function (board) {
//         return `<option value=${board}>${board}</option>`;
//         // without the join, we get an array, which we don't want
//     }).join('');
// }

select.innerHTML = masterHTML;