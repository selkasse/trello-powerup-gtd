const t = TrelloPowerUp.iframe();
import test from './client.js'
window.schedule.addEventListener('submit', function (event) {
    // Stop the browser trying to submit the form itself.
    event.preventDefault();
    // Set the scheduled date for the card
    return t.set('card', 'shared', 'schedule', window.scheduledCard.value)
        .then(function () {
            t.closePopup();
        });
});

// When schedule.html is rendered, display the current value of the scheduled date
t.render(function () {
    return t.get('card', 'shared', 'schedule')
        .then(function (scheduledDate) {
            console.log(test);
            window.scheduledCard.value = scheduledDate;
        })
    // sizeTo documentation:
    // https://developer.atlassian.com/cloud/trello/power-ups/ui-functions/t-sizeto/
        .then(function () {
            // Resize the schedule.html popup
            // The popup will resize based on the size of <form id="schedule">
            t.sizeTo('#schedule').done();
        });
});