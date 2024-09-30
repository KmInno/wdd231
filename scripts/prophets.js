const url = 'https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json';

const cards = document.querySelector('#cards');

async function getProphetData() {
    const response = await fetch(url);

    const data = await response.json();

    console.table(data.prophets);

    displayProphets(data.prophets);
}

function displayProphets(prophets) {
    prophets.forEach((prophet) => {
        let card = document.createElement('section');

        let h2 = document.createElement('h2');
        let pBirthdate = document.createElement('p');
        let pBirthplace = document.createElement('p');
        let pChildren = document.createElement('p');
        let image = document.createElement('img');

        h2.textContent = `${prophet.name} ${prophet.lastname}`;

        pBirthdate.textContent = `Date of Birth: ${prophet.birthdate}`;
        pBirthplace.textContent = `Place of Birth: ${prophet.birthplace}`;
        pChildren.textContent = `Number of Children: ${prophet.numofchildren}`;

        image.setAttribute('src', prophet.imageurl);
        image.setAttribute('alt', `${prophet.name} ${prophet.lastname} - Portrait`);
        image.setAttribute('loading', 'lazy');

        card.appendChild(h2);
        card.appendChild(pBirthdate);
        card.appendChild(pBirthplace);
        card.appendChild(pChildren);
        card.appendChild(image);

        cards.appendChild(card);
    });
}

getProphetData();
