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
