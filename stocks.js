console.log("Stocks page loaded");

if (annyang) {
  const commands = {
    hello: () => {
      alert("Hello World");
    },
    "change the color to *color": (color) => {
      document.body.style.backgroundColor = color;
    },
    "navigate to *page": (page) => {
      const lowerPage = page.toLowerCase();
      if (lowerPage.includes("home")) {
        window.location.href = "index.html";
      } else if (lowerPage.includes("stocks")) {
        window.location.href = "stocks.html";
      } else if (lowerPage.includes("dogs")) {
        window.location.href = "dogs.html";
      }
    },
    "lookup *stock": (stock) => {
      document.getElementById("stockInput").value = stock.toUpperCase();
      document.getElementById("lookupBtn").click(); // You will define this button later
    },
  };

  annyang.addCommands(commands);

  document.getElementById("start-voice").addEventListener("click", () => {
    annyang.start();
  });

  document.getElementById("stop-voice").addEventListener("click", () => {
    annyang.abort();
  });
}

const POLYGON_API_KEY = "ECexKbixWEfStBvfpkKr4VA0Iw953G3l";

document.getElementById("lookupBtn").addEventListener("click", async () => {
  const symbol = document.getElementById("stockInput").value.toUpperCase();
  const days = document.querySelector('input[name="days"]:checked').value;
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(endDate.getDate() - parseInt(days));

  const formatDate = (date) => date.toISOString().split("T")[0];

  const url = `https://api.polygon.io/v2/aggs/ticker/${symbol}/range/1/day/${formatDate(
    startDate
  )}/${formatDate(
    endDate
  )}?adjusted=true&sort=asc&limit=120&apiKey=${POLYGON_API_KEY}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    const results = data.results;

    const labels = results.map((d) => new Date(d.t).toLocaleDateString());
    const prices = results.map((d) => d.c); // closing prices

    renderChart(symbol, labels, prices);
  } catch (err) {
    alert("Error fetching stock data");
    console.error(err);
  }
});

let chart;
function renderChart(symbol, labels, data) {
  const ctx = document.getElementById("stockChart").getContext("2d");
  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          label: `${symbol} Closing Price`,
          data,
          borderColor: "blue",
          fill: false,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        x: { display: true },
        y: { display: true },
      },
    },
  });
}

async function loadRedditStocks() {
  const res = await fetch(
    "https://tradestie.com/api/v1/apps/reddit?date=2022-04-03"
  );
  const data = await res.json();
  const top5 = data.slice(0, 5);

  const tableBody = document.querySelector("#redditTable tbody");
  tableBody.innerHTML = ""; // Clear any previous data

  top5.forEach((stock) => {
    const tr = document.createElement("tr");

    // Link to Yahoo Finance
    const tickerLink = document.createElement("a");
    tickerLink.href = `https://finance.yahoo.com/quote/${stock.ticker}`;
    tickerLink.target = "_blank";
    tickerLink.textContent = stock.ticker;

    const tdTicker = document.createElement("td");
    tdTicker.appendChild(tickerLink);

    const tdMentions = document.createElement("td");
    tdMentions.textContent = stock.no_of_comments;

    const tdSentiment = document.createElement("td");
    tdSentiment.textContent = stock.sentiment;
    tdSentiment.style.color = stock.sentiment === "Bullish" ? "green" : "red";

    tr.append(tdTicker, tdMentions, tdSentiment);
    tableBody.appendChild(tr);
  });
}

window.addEventListener("DOMContentLoaded", loadRedditStocks);
