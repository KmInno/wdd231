const apiUrl = './data/members.json'; // Adjusted path to reference the JSON file

fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        const membersContainer = document.querySelector('.members');
        // Clear existing members (if needed)
        membersContainer.innerHTML = '';

        // Loop through the first three members
        data.companies.slice(0, 3).forEach(company => {
            const memberCard = document.createElement('div');
            memberCard.classList.add('member');

            memberCard.innerHTML = `
                <div class="member-header">
                    <h6>${company.name}</h6>
                    <p>${company.description}</p>
                    <hr>                    
                </div>

                <div class="member-body">
                    <img src="${company.icon}" alt="${company.name} Logo" class="member-icon">
                    <div class="member-text">
                        <p>Address: ${company.address}</p>
                        <p>Phone: ${company.phone}</p>                   
                    </div>

                </div>
            `;

            membersContainer.appendChild(memberCard);
        });
    })
    .catch(error => console.error('Error fetching member data:', error));

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
