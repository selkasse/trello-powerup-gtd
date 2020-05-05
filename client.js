const Promise = TrelloPowerUp.Promise;

const CHECK_MARK_ICON = 'https://img.icons8.com/color/48/000000/check-all.png';

TrelloPowerUp.initialize({
    'card-buttons': function(t, options){
        return [{
            icon: CHECK_MARK_ICON,
            text: 'GTD'
        }];
    }
});