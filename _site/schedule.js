const t = TrelloPowerUp.iframe();

window.schedule.addEventListener('submit', function (event) {
    // Stop the browser trying to submit the form itself.
    event.preventDefault();
    return t.set('card', 'shared', 'schedule', window.scheduledCard.value)
        .then(function () {
            t.closePopup();
        });
});

t.render(function () {
    return t.get('card', 'shared', 'schedule')
        .then(function (scheduledDate) {
            window.scheduledCard.value = scheduledDate;
        })
        .then(function () {
            t.sizeTo('#schedule').done();
        });
});