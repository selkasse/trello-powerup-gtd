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
               icon: CHECK_MARK_ICON,
               text: schedule
           }];
       });
    }
});