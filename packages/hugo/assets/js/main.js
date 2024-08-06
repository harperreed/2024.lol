// assets/js/main.js
import countdown from 'countdown';

document.addEventListener('DOMContentLoaded', () => {
  const primaryCountElement = document.getElementById('primary-count');
  const primaryUnitElement = document.getElementById('primary-unit');
  const secondaryCountElement = document.getElementById('secondary-count');
  const tweetButton = document.getElementById('tweetBtn');

  function updateCounter() {
    const electionDate = new Date(2024, 10, 5, 9, 0, 0); // November 5, 2024, 9:00 AM
    const now = new Date();

    const timespan = countdown(now, electionDate, countdown.DAYS|countdown.HOURS|countdown.MINUTES|countdown.SECONDS);

    let primaryCount, primaryUnit, secondaryCount;

    if (timespan.days > 0) {
      primaryCount = timespan.days;
      primaryUnit = timespan.days === 1 ? ' day' : ' days';
      secondaryCount = `${timespan.hours} hours, ${timespan.minutes} minutes, ${timespan.seconds} seconds`;
    } else if (timespan.hours > 0) {
      primaryCount = timespan.hours;
      primaryUnit = timespan.hours === 1 ? ' hour' : ' hours';
      secondaryCount = `${timespan.minutes} minutes, ${timespan.seconds} seconds`;
    } else if (timespan.minutes > 0) {
      primaryCount = timespan.minutes;
      primaryUnit = timespan.minutes === 1 ? ' minute' : ' minutes';
      secondaryCount = `${timespan.seconds} seconds`;
    } else {
      primaryCount = timespan.seconds;
      primaryUnit = timespan.seconds === 1 ? ' second' : ' seconds';
      secondaryCount = '';
    }

    primaryCountElement.textContent = primaryCount;
    primaryUnitElement.textContent = primaryUnit;
    secondaryCountElement.textContent = secondaryCount;

    updateTweetButton(primaryCount, primaryUnit.trim());
  }

  function updateTweetButton(count, unit) {
    const tweetText = `The election is coming: ${count} ${unit} left - Get involved now!`;
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}&url=${encodeURIComponent('https://example.com')}&hashtags=Vote`;

    tweetButton.href = tweetUrl;
    tweetButton.textContent = 'Tweet the countdown';
  }

  // Update counter every second
  setInterval(updateCounter, 1000);

  // Initial update
  updateCounter();
});
