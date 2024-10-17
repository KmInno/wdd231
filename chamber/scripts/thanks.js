function displayDateModified() {
    const lastModified = new Date(document.lastModified);
    const lastModifiedSpan = document.getElementById('displayDateModified');
    lastModifiedSpan.textContent = lastModified.toLocaleString();
}



//add event listener to menu button and nav links
const hamButton = document.querySelector('#menuButton');
const navigation = document.querySelector('.navbar-menu');

hamButton.addEventListener('click', () => {
    navigation.classList.toggle('open');
    hamButton.classList.toggle('open');
});


function parseUrlParams() {
    // Get the URL of the current page
    const queryString = window.location.search;


    // Remove the leading '?' from the query string and split it by '&'
    const queryParams = queryString.substring(1).split("&");

    // Create an empty object to store the key-value pairs
    const params = {};

    // Loop through the array of parameters
    queryParams.forEach(function(param) {
        // Split each key-value pair by '='
        const [key, value] = param.split("=");
        
        // Decode the URL-encoded value and store it in the params object
        params[key] = decodeURIComponent(value);
    });

    // Display the extracted values in the respective HTML elements
    document.getElementById('firstName').textContent = params['first'];
    document.getElementById('lastName').textContent = params['last'];
    document.getElementById('orgTitle').textContent = params['org_title'];
    document.getElementById('email').textContent = params['email'];
    document.getElementById('phone').textContent = params['phone'];
    document.getElementById('organization').textContent = params['organization'];
    document.getElementById('membership').textContent = params['membership'];
    document.getElementById('orgDescription').textContent = params['org_description'];
}

// Call the function to parse the URL parameters when the page loads
// window.onload = parseUrlParams;
window.onload = function () {
    displayDateModified()
    parseUrlParams();
}

