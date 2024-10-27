function displayDateModified() {
    const lastModified = new Date(document.lastModified);
    const lastModifiedSpan = document.getElementById('displayDateModified');
    lastModifiedSpan.textContent = lastModified.toLocaleString();
}

window.onload = function () {
    displayDateModified();
}

//add event listener to menu button and nav links
const hamButton = document.querySelector('#menuButton');
const navigation = document.querySelector('.navbar-menu');

hamButton.addEventListener('click', () => {
    navigation.classList.toggle('open');
    hamButton.classList.toggle('open');
});

document.addEventListener('DOMContentLoaded', () => {
    const toursContainer = document.querySelector('.tours');
    const listViewButton = document.getElementById('list-view');
    const gridViewButton = document.getElementById('grid-view');

    listViewButton.addEventListener('click', () => {
        toursContainer.classList.remove('row');
        toursContainer.classList.add('column');
    });

    gridViewButton.addEventListener('click', () => {
        toursContainer.classList.remove('column');
        toursContainer.classList.add('row');
    });
});

function filterTours(category) {
    const tours = document.querySelectorAll('.tour-card');
    
    tours.forEach(tour => {
        const tourCategory = tour.getAttribute('data-category');
        
        // Show all tours if "all" is selected, or if the tour has the selected category
        if (category === 'all' || tourCategory === category) {
            tour.style.display = 'block';
        } else {
            tour.style.display = 'none';
        }
    });
}

document.querySelector('.contact-form').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent actual form submission

    // Show the modal
    const modal = document.getElementById('thankYouModal');
    modal.style.display = 'block';
    
    // Close the modal when clicking the 'X' button
    document.querySelector('.close').onclick = function () {
        modal.style.display = 'none';
    };
    
    // Close the modal when clicking outside the modal content
    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };
});


