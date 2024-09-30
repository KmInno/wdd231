const apiUrl = './data/members.json'; // Adjusted path to reference the JSON file

// Load the view preference from localStorage or default to grid view
let isGridView = localStorage.getItem('isGridView') === 'false' ? false : true;

// Fetch and display companies
async function fetchCompanies() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        displayCompanies(data.companies);
    } catch (error) {
        console.error('Error fetching companies:', error);
    }
}

function displayCompanies(companies) {
    const membersDiv = document.getElementById('members');
    membersDiv.innerHTML = ''; // Clear previous content

    // Set the appropriate class for grid or list view
    membersDiv.className = isGridView ? 'grid' : 'list';

    companies.forEach(company => {
        const item = document.createElement('div');
        item.className = isGridView ? 'card' : 'list-item'; // Use card for grid, list-item for list view

        item.innerHTML = `
            <img src="${company.icon}" alt="${company.name}" style="width: 200px;">
            <h4>${company.name}</h4>
            <p>${company.address}</p>
            <p>${company.phone}</p>
            <p><a href="${company.website}" target="_blank">Website</a></p>
            <p>Membership Level: ${company.membership_level}</p>
            <p>${company.description}</p>
        `;
        membersDiv.appendChild(item);
    });
}

// Event listeners for the buttons
document.getElementById('gridViewBtn').addEventListener('click', () => {
    isGridView = true;
    localStorage.setItem('isGridView', true); // Save grid view to localStorage
    fetchCompanies();  
});

document.getElementById('listViewBtn').addEventListener('click', () => {
    isGridView = false;
    localStorage.setItem('isGridView', false); // Save list view to localStorage
    fetchCompanies();
});

// Display current year and last modified date in the footer
function displayDateModified() {
    const lastModified = new Date(document.lastModified);
    const lastModifiedSpan = document.getElementById('displayDateModified');
    lastModifiedSpan.textContent = lastModified.toLocaleString();
}

window.onload = function() {
    displayDateModified();
    fetchCompanies(); // Load companies on page load with the preferred view
}
