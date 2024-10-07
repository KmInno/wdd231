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
                    <h4>${company.name}</h4>
                    <p>${company.description}</p>
                    <hr>                    
                </div>

                <div>
                    <img src="${company.icon}" alt="${company.name} Logo" class="member-icon">
                    <p>Address: ${company.address}</p>
                    <p>Phone: ${company.phone}</p>
                    <p>Website: <a href="${company.website}" target="_blank">${company.website}</a></p>
                </div>
            `;

            membersContainer.appendChild(memberCard);
        });
    })
    .catch(error => console.error('Error fetching member data:', error));
