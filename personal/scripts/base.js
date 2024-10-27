function displayDateModified() {
    const lastModified = new Date(document.lastModified);
    const lastModifiedSpan = document.getElementById('displayDateModified');
    lastModifiedSpan.textContent = lastModified.toLocaleString();
}

window.onload = function () {
    displayDateModified();
}

// Add event listener to menu button and nav links
const hamButton = document.querySelector('#menuButton');
const navigation = document.querySelector('.navbar-menu');

hamButton.addEventListener('click', () => {
    navigation.classList.toggle('open');
    hamButton.classList.toggle('open');
});

document.addEventListener("DOMContentLoaded", async function() {
    const topToursContainer = document.querySelector(".top-tours-cards");
    const featuredToursContainer = document.querySelector(".featured-cards");

    // Function to fetch tours data from the external JSON file
    async function fetchToursData() {
        try {
            const response = await fetch('./data/tours.json');
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            return data.tours;
        } catch (error) {
            console.error('Error loading tours data:', error);
            return [];
        }
    }

    // Function to populate tours in the HTML
    async function loadTours() {
        const tours = await fetchToursData();

        // Load top tours
        tours.filter(tour => tour.category === "top").forEach(tour => {
            const tourCard = document.createElement("div");
            tourCard.className = "tour-card";
            tourCard.innerHTML = `
                <img src="${tour.image}" alt="${tour.title}" loading="lazy" />
                <h3>${tour.title}</h3>
                <p>${tour.description}</p>
                <button>More</button>
            `;
            topToursContainer.appendChild(tourCard);
        });

        // Load featured tours
        tours.filter(tour => tour.category === "featured").forEach(tour => {
            const featureCard = document.createElement("div");
            featureCard.className = "feature-card";
            featureCard.innerHTML = `
                <img src="${tour.image}" alt="${tour.title}" loading="lazy" />
                <h3>${tour.title}</h3>
                <p>${tour.description}</p>
                <button>More</button>
            `;
            featuredToursContainer.appendChild(featureCard);
        });
    }

    // Call the loadTours function to populate the page
    loadTours();
});
