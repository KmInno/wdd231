async function loadTours() {
    try {
        const response = await fetch('./data/tours.json');
        const data = await response.json();
        
        const tours = data.tours;

        if (!Array.isArray(tours)) {
            throw new Error("Tours data is not an array");
        }

        const toursContainer = document.querySelector('.tours');
        
        tours.forEach(tour => {
            const tourCard = document.createElement('div');
            tourCard.classList.add('tour-card');
            
            // Set the category as a data attribute for filtering
            tourCard.setAttribute('data-category', tour.category);

            // Create the image container and image
            const imageContainer = document.createElement('div');
            imageContainer.classList.add('tour-image-container');
            
            const tourImage = document.createElement('img');
            tourImage.src = tour.image;
            tourImage.alt = tour.title;
            imageContainer.appendChild(tourImage);

            // Create the title and description container
            const infoContainer = document.createElement('div');
            infoContainer.classList.add('tour-info-container');
            
            const tourTitle = document.createElement('h3');
            tourTitle.textContent = tour.title;
            
            const tourDescription = document.createElement('p');
            tourDescription.textContent = tour.description;
            
            infoContainer.appendChild(tourTitle);
            infoContainer.appendChild(tourDescription);

            // Append both containers to the main card
            tourCard.appendChild(imageContainer);
            tourCard.appendChild(infoContainer);

            // Append the card to the container
            toursContainer.appendChild(tourCard);
        });
    } catch (error) {
        console.error('Error loading tours:', error);
    }
}

// Call the loadTours function when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', loadTours);
