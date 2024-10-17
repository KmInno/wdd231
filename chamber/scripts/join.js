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

document.getElementById('timestamp').value = new Date().toISOString();


// Get the dialog and modal content
const dialog = document.getElementById('dialogBox');
const modalContent = document.getElementById('modalContent');

// Function to open the modal with specific content
function openModal(content) {
    modalContent.innerHTML = content;

    // Attach event listener to the dynamically created close button
    const closeButton = modalContent.querySelector('#closeButton');
    closeButton.addEventListener('click', closeModal);

    dialog.showModal();
}

// Function to close the modal
function closeModal() {
    dialog.close();
}

// Event listeners for the buttons to open modals with respective content
document.getElementById('openButton1').addEventListener('click', () => {
    openModal(`<div class="heading">
                <h3>NP Membership Benefits</h3>
                <button id="closeButton">❌</button>
               </div>
               <ul>
                 <li>Access to special community events</li>
                 <li>Participation in networking opportunities</li>
                 <li>Basic listing in the organization directory</li>
               </ul>`);
});

document.getElementById('openButton2').addEventListener('click', () => {
    openModal(`<div class="heading">
                <h3>Bronze Membership Benefits</h3>
                <button id="closeButton">❌</button>
               </div>
               <ul>
                 <li>Event discounts</li>
                 <li>Basic advertising in the organization directory</li>
                 <li>Access to networking events</li>
                 <li>Training sessions and workshops</li>
               </ul>`);
});

document.getElementById('openButton3').addEventListener('click', () => {
    openModal(`<div class="heading">
                <h3>Silver Membership Benefits</h3>
                <button id="closeButton">❌</button>
               </div>
               <ul>
                 <li>All Bronze benefits</li>
                 <li>Priority event participation</li>
                 <li>Spotlight advertising on the homepage</li>
                 <li>Additional discounts on events</li>
               </ul>`);
});

document.getElementById('openButton4').addEventListener('click', () => {
    openModal(`<div class="heading">
                <h3>Gold Membership Benefits</h3>
                <button id="closeButton">❌</button>
               </div>
               <ul>
                 <li>All Silver benefits</li>
                 <li>Exclusive access to premium events</li>
                 <li>Maximum advertising exposure</li>
                 <li>Special invitations to sponsor high-profile events</li>
               </ul>`);
});
