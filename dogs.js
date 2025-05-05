console.log("Dogs page loaded");

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
    'load dog breed *breed': (breed) => {
    const breedId = breed.toLowerCase().replaceAll(' ', '-');
    const button = document.getElementById(breedId);
    if (button) {
        button.click();
    } else {
        alert(`Dog breed '${breed}' not found.`);
    }
}
  };

  annyang.addCommands(commands);

  document.getElementById("start-voice").addEventListener("click", () => {
    annyang.start();
  });

  document.getElementById("stop-voice").addEventListener("click", () => {
    annyang.abort();
  });
}

function loadDogCarousel() {
  fetch("https://dog.ceo/api/breeds/image/random/10")
    .then((res) => res.json())
    .then((data) => {
      const carousel = document.getElementById("dog-carousel");
      carousel.innerHTML = "";

      data.message.forEach((url) => {
        const img = document.createElement("img");
        img.src = url;
        img.alt = "Cute Dog";
        img.style.width = "300px";
        img.style.height = "auto";
        carousel.appendChild(img);
      });

      // Initialize SimpleSlider
      simpleslider.getSlider({
        container: carousel,
        transitionDuration: 1,
        delay: 3,
      });
    })
    .catch((err) => {
      console.error("Failed to load dog images:", err);
    });
}

window.addEventListener("DOMContentLoaded", loadDogCarousel);

function loadDogBreeds() {
    fetch('https://dogapi.dog/api/v2/breeds')
      .then(res => res.json())
      .then(data => {
        const breeds = data.data;
        const buttonContainer = document.getElementById('breed-buttons');
  
        breeds.forEach(breed => {
          const btn = document.createElement('button');
          btn.textContent = breed.attributes.name;
          btn.id = breed.attributes.name.toLowerCase().replace(/\s+/g, '-');
          btn.className = 'breed-button';
  
          btn.addEventListener('click', () => {
            displayBreedInfo(breed);
          });
  
          buttonContainer.appendChild(btn);
        });
      })
      .catch(err => {
        console.error('Error loading dog breeds:', err);
      });
  }
  
  function displayBreedInfo(breed) {
    const infoDiv = document.getElementById('breed-info');
    const { name, description, life } = breed.attributes;
    infoDiv.innerHTML = `
      <h3>${name}</h3>
      <p>${description}</p>
      <p><strong>Lifespan:</strong> ${life.min} - ${life.max} years</p>
    `;
  }
  
  window.addEventListener('DOMContentLoaded', loadDogBreeds);
  