const t = TrelloPowerUp.iframe();

window.schedule.addEventListener('submit', function (event) {
    // Stop the browser trying to submit the form itself.
    event.preventDefault();
    // Set the scheduled date for the card
    return t.set('card', 'shared', 'schedule', window.scheduledCard.value)
        .then(function () {
            t.closePopup();
        });
});

// When the card button is pressed, display the current value of the scheduled date
t.render(function () {
    return t.get('card', 'shared', 'schedule')
        .then(function (scheduledDate) {
            window.scheduledCard.value = scheduledDate;
        })
    // sizeTo documentation:
    // https://developer.atlassian.com/cloud/trello/power-ups/ui-functions/t-sizeto/
        .then(function () {
            t.sizeTo('#schedule').done();
        });
});