function displayDateModified() {
    const lastModified = new Date(document.lastModified);
    const lastModifiedSpan = document.getElementById('displayDateModified');
    lastModifiedSpan.textContent = lastModified.toLocaleString();
}

window.onload = function() {
    displayDateModified();
}

document.getElementById('hamburger-menu').addEventListener('click', function() {
    var navbar = document.getElementById('navbar').querySelector('ul');
    navbar.classList.toggle('show');
});

const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming.',
        technology: ['Python'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web.',
        technology: ['HTML', 'CSS'],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become efficient computer programmers.',
        technology: ['Python'],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce classes and objects.',
        technology: ['C#'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior web fundamentals experience.',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: true,
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course focuses on user experience and accessibility.',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: false 
    }
];

// Function to display courses as buttons
function displayCourses(filteredCourses) {
    const courseList = document.querySelector('.six-buttons');
    courseList.innerHTML = ''; 

    filteredCourses.forEach(course => {
        const courseButton = document.createElement('button');
        courseButton.innerHTML = `${course.subject} ${course.number}`;
        courseButton.classList.add(course.subject.toLowerCase());

        if (course.completed) {
            courseButton.classList.add('completed'); 
        }
        
        courseList.appendChild(courseButton);
    });
}

// Function to filter courses by subject
function filterCourses(subject) {
    if (subject === 'All') {
        return courses;
    }
    return courses.filter(course => course.subject === subject);
}

// Event listeners for subject buttons
document.querySelectorAll('.three-buttons button').forEach(button => {
    button.addEventListener('click', () => {
        const subject = button.innerText;
        const filteredCourses = filterCourses(subject);
        displayCourses(filteredCourses);
    });
});

// Display all courses on initial load
displayCourses(courses);

function calculateTotalCredits() {
    // Use reduce to sum up all the credits
    const totalCredits = courses.reduce((total, course) => total + course.credits, 0);
    
    // Update the HTML element with the total credits
    document.getElementById('total-credits').textContent = totalCredits;
}

// Call the function to calculate and display total credits
calculateTotalCredits();

