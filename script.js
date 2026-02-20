'use strict';



/**
 * add event on element
 */

const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
}



/**
 * navbar toggle
 */

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const navLinks = document.querySelectorAll("[data-nav-link]");

const toggleNavbar = function () { navbar.classList.toggle("active"); }

addEventOnElem(navTogglers, "click", toggleNavbar);

const closeNavbar = function () { navbar.classList.remove("active"); }

addEventOnElem(navLinks, "click", closeNavbar);



/**
 * header & back top btn active
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

window.addEventListener("scroll", function () {
  if (window.scrollY >= 100) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
});

// Import Firebase Firestore functions
import { addDoc, collection } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

let sendEmail = document.getElementById("sendemail");
sendEmail.addEventListener('click', async function(e){
  e.preventDefault()
  
  let name = document.getElementById('name').value;
  let email = document.getElementById('email').value;
  let number = document.getElementById('number').value;
  let message = document.getElementById('message').value;

  // Validate inputs
  if(!name || !email || !number || !message) {
    alert("Please fill in all fields!");
    return;
  }

  try {
    // Add data to Firebase Firestore
    const docRef = await addDoc(collection(window.db, "messages"), {
      name: name,
      email: email,
      number: number,
      message: message,
      timestamp: new Date().toISOString()
    });
    
    console.log("Document written with ID: ", docRef.id);
    alert("Message sent successfully!");
    
    // Clear form fields
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('number').value = '';
    document.getElementById('message').value = '';
    
  } catch (error) {
    console.error("Error adding document: ", error);
    alert("Error sending message. Please try again!");
  }

})

// Class Modal Functionality
const classData = {
  'weight-lifting': {
    title: 'Weight Lifting',
    image: './assets/images/class-1.jpg',
    description: 'Build strength and muscle with our professional weight training sessions. Our certified trainers will guide you through proper form and techniques to maximize your gains safely.',
    timing: '7:00 AM - 9:00 PM',
    trainer: 'Kamalesh'
  },
  'cardio-strength': {
    title: 'Cardio & Strength',
    image: './assets/images/class-2.jpg',
    description: 'Improve your endurance and build functional strength with our combined cardio and strength training program. Perfect for burning calories while building lean muscle.',
    timing: '8:00 AM - 8:00 AM',
    trainer: 'Deva'
  },
  'power-yoga': {
    title: 'Power Yoga',
    image: './assets/images/class-3.jpg',
    description: 'Enhance flexibility, strength, and mental focus through our dynamic power yoga sessions. Combines traditional yoga poses with modern fitness principles.',
    timing: '5:00 AM - 6:30 AM',
    trainer: 'Yamuna'
  },
  'fitness-pack': {
    title: 'The Fitness Pack',
    image: './assets/images/class-4.jpg',
    description: 'Complete fitness package with varied workouts for all levels. Includes HIIT, strength training, cardio, and flexibility exercises for overall body transformation.',
    timing: '8: 00 AM - 8:00 PM',
    trainer: 'Daas Na'
  }
};

// Get modal elements
const modal = document.getElementById('class-modal');
const modalTitle = document.getElementById('modal-title');
const modalImage = document.getElementById('modal-image');
const modalDescription = document.getElementById('modal-description');
const modalTiming = document.getElementById('modal-timing');
const modalTrainer = document.getElementById('modal-trainer');
const modalClose = document.querySelector('.modal-close');

// Add click event to all class cards
const classCards = document.querySelectorAll('.class-card');
classCards.forEach(card => {
  card.addEventListener('click', function() {
    const classKey = this.getAttribute('data-class');
    const data = classData[classKey];
    
    if (data) {
      modalTitle.textContent = data.title;
      modalImage.src = data.image;
      modalDescription.textContent = data.description;
      modalTiming.textContent = data.timing;
      modalTrainer.textContent = data.trainer;
      
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  });
});

// Close modal on X button click
modalClose.addEventListener('click', function() {
  modal.classList.remove('active');
  document.body.style.overflow = 'auto';
});

// Close modal on clicking outside
modal.addEventListener('click', function(e) {
  if (e.target === modal) {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
});

// Close modal on Escape key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape' && modal.classList.contains('active')) {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
});

// Explore More Button Modal Functionality
const exploreMoreBtn = document.getElementById('explore-more-btn');
const modalOverlay = document.getElementById('modal-overlay');
const modalCloseBtn = document.getElementById('modal-close');

// Open modal when clicking Explore More button
if (exploreMoreBtn) {
  exploreMoreBtn.addEventListener('click', function(e) {
    e.preventDefault();
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
}

// Close modal when clicking X button
if (modalCloseBtn) {
  modalCloseBtn.addEventListener('click', function() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
  });
}

// Close modal when clicking outside the popup
if (modalOverlay) {
  modalOverlay.addEventListener('click', function(e) {
    if (e.target === modalOverlay) {
      modalOverlay.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  });
}

// Close modal on Escape key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
});
