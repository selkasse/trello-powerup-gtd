const Promise = TrelloPowerUp.Promise;

const CHECK_MARK_ICON = 'https://img.icons8.com/ios-glyphs/30/000000/check-all.png';

const onCardBtnClick = function (t, options) {
    return t.popup({
        title: 'Add to future board',
        url: 'schedule.html'
    });
}

TrelloPowerUp.initialize({
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