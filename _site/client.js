const Promise = TrelloPowerUp.Promise;

const CHECK_MARK_ICON = 'https://img.icons8.com/material/24/000000/check-all.png';
const MASTER_ICON_DARK = 'https://img.icons8.com/material/24/000000/master.png';
const MASTER_ICON_LIGHT = 'https://img.icons8.com/material-outlined/24/000000/master.png';

fetch('https://api.trello.com/1/members/me?key=41ae5bff41af5eac3f32ad7a4daab49e&token=5e71d684035b882896f8ecfc32de15dee8c64b0e73b8c965609c3c7473f47661', {
    method: 'GET',
    headers: {
        'Accept': 'application/json'
    }
})
    .then(response => {
        console.log(
            `Response: ${response.status} ${response.statusText}`
        );
        return response.text();
    })
    .then(text => console.log(text.id))
    .catch(err => console.error(err));

const onCardBtnClick = function (t, options) {
    return t.popup({
        title: 'Add to future board',
        url: 'schedule.html'
    });
}

const onBoardBtnClick = function(t, options){
    // try t["board"] if this does not work
    console.log(t.board);
    return t.popup({
        title: 'Change Master Board',
        url: 'master.html'
    })
}

TrelloPowerUp.initialize({
    'board-buttons': function(t, options){
        return [{
           icon: {
               dark: MASTER_ICON_DARK,
               light: MASTER_ICON_LIGHT
           },
           text: 'Master Board',
           callback: onBoardBtnClick,
           condition: 'edit'
        }]
    },
    'card-buttons': function(t, options){
        return [{
            icon: CHECK_MARK_ICON,
            text: 'GTD',
            callback: onCardBtnClick
        }];
    },
    'card-badges': function(t, options) {
       return t.get('card', 'shared', 'schedule')
       .then(function(schedule){
           return [{
               icon: schedule ? CHECK_MARK_ICON : null,
               text: schedule ? schedule : null
           }];
       });
    },
    'card-detail-badges': function(t, options) {
        return t.get('card', 'shared', 'schedule')
        .then(function(schedule) {
            console.log(schedule);
            return [{
                title: 'Schedule',
                color: schedule ? 'green' : 'blue',
                text: schedule ? `Scheduled for ${schedule}` : 'Schedule for a future board',
                callback: onCardBtnClick
            }]
        })
    }
});