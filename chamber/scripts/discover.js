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


// Lazy loading using IntersectionObserver
document.addEventListener("DOMContentLoaded", function() {
    const lazyImages = document.querySelectorAll('.lazy-image');

    // Create an IntersectionObserver instance
    const lazyImageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;

                // Replace the placeholder data-src with the actual src
                img.src = img.getAttribute('data-src');
                img.classList.remove('lazy-image'); // Remove lazy class after loading

                // Stop observing the image once it has been loaded
                lazyImageObserver.unobserve(img);
            }
        });
    });

    // Observe each lazy image
    lazyImages.forEach(image => {
        lazyImageObserver.observe(image);
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const visitorMessage = document.getElementById('visitor-message');
    const modal = document.getElementById('visitor-modal');
    const closeModal = document.querySelector('.close');

    const lastVisit = localStorage.getItem('lastVisit');
    const currentDate = new Date();
    let message = '';

    if (!lastVisit) {
        // First-time visit
        message = "Welcome! Let us know if you have any questions.";
    } else {
        // Calculate the time difference in days
        const lastVisitDate = new Date(lastVisit);
        const timeDifference = currentDate - lastVisitDate;
        const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

        if (daysDifference < 1) {
            // If less than a day
            message = "Back so soon! Awesome!";
        } else if (daysDifference === 1) {
            // Exactly 1 day ago
            message = "You last visited 1 day ago.";
        } else {
            // More than 1 day ago
            message = `You last visited ${daysDifference} days ago.`;
        }
    }

    // Display the message in the modal
    visitorMessage.innerHTML = message;

    // Show the modal
    modal.style.display = "flex";

    // Close the modal when the user clicks on the close button
    closeModal.onclick = function () {
        modal.style.display = "none";
    };

    // Also close the modal when clicking outside the modal content
    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };

    // Update the last visit date in localStorage
    localStorage.setItem('lastVisit', currentDate.toISOString());
});

