const Promise = TrelloPowerUp.Promise;

const CHECK_MARK_ICON = 'https://img.icons8.com/ios-glyphs/30/000000/check-all.png';

TrelloPowerUp.initialize({
    'card-buttons': function(t, options){
        return [{
            icon: CHECK_MARK_ICON,
            text: 'GTD',
            callback: function(t){
                return t.popup({
                    title: 'Add to future board',
                    url: 'schedule.html'
                });
            }
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
        return t.get('card', 'shared', 'scheduled')
        .then(function(schedule) {
            console.log(schedule);
            return [{
                title: 'Scheduled',
                color: schedule ? 'green' : 'blue',
                text: schedule ? `Scheduled for ${schedule}` : 'Schedule for a future board',
                callback: function (t) {
                    return t.popup({
                        title: 'Add to future board',
                        url: 'schedule.html'
                    });
                }
            }]
        })
    }
});