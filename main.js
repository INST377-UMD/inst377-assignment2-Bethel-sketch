console.log('Main page loaded');

if (annyang) {
  const commands = {
    'hello': () => {
      alert('Hello World');
    },
    'change the color to *color': (color) => {
      document.body.style.backgroundColor = color;
    },
    'navigate to *page': (page) => {
      const lowerPage = page.toLowerCase();
      if (lowerPage.includes('home')) {
        window.location.href = 'index.html';
      } else if (lowerPage.includes('stocks')) {
        window.location.href = 'stocks.html';
      } else if (lowerPage.includes('dogs')) {
        window.location.href = 'dogs.html';
      }
    }
  };

  annyang.addCommands(commands);

  document.getElementById('start-voice').addEventListener('click', () => {
    annyang.start();
  });

  document.getElementById('stop-voice').addEventListener('click', () => {
    annyang.abort();
  });
}

// Fetch random quote on page load
window.addEventListener('DOMContentLoaded', () => {
    fetch('https://zenquotes.io/api/random')
      .then(response => response.json())
      .then(data => {
        const quote = data[0];
        document.getElementById('quote-text').textContent = `"${quote.q}"`;
        document.getElementById('quote-author').textContent = `– ${quote.a}`;
      })
      .catch(error => {
        document.getElementById('quote-text').textContent = "Failed to load quote.";
        console.error('Error fetching quote:', error);
      });
  });
  