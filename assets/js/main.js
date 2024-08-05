import countdown from 'countdown';

document.addEventListener('DOMContentLoaded', () => {
  const counterElement = document.getElementById('counter');
  const tweetButton = document.getElementById('tweetBtn');

  function updateCounter() {
    const electionDate = new Date(2024, 10, 5, 9, 0, 0); // November 5, 2024, 9:00 AM
    const now = new Date();

    const timespan = countdown(now, electionDate, countdown.MONTHS|countdown.DAYS|countdown.HOURS|countdown.MINUTES|countdown.SECONDS);

    counterElement.innerHTML = `
      <div><strong>${timespan.months}</strong> <em>months</em></div>
      <div><strong>${timespan.days}</strong> <em>days</em></div>
      <div><strong>${timespan.hours}</strong> <em>hours</em></div>
      <div><strong>${timespan.minutes}</strong> <em>minutes</em></div>
      <div><strong>${timespan.seconds}</strong> <em>seconds</em></div>
    `;

    updateTweetButton(timespan.days);
  }

  function updateTweetButton(daysLeft) {
    const tweetText = `The election is coming: ${daysLeft} days left - Get involved now!`;
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}&url=${encodeURIComponent('https://example.com')}&hashtags=Vote`;

    tweetButton.href = tweetUrl;
  }

  // Update counter every second
  setInterval(updateCounter, 1000);

  // Initial update
  updateCounter();
});
