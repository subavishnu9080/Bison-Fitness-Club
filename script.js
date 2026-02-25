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

// Contact Form - Send Message to Firebase
document.addEventListener('DOMContentLoaded', function() {
  let sendEmail = document.getElementById("sendemail");
  
  if (sendEmail) {
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

      // Check if Firebase is initialized
      if (!window.db) {
        alert("Firebase not initialized. Please refresh the page.");
        return;
      }

      try {
        // Add data to Firebase Firestore
        const docRef = await window.db.collection("messages").add({
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
    });
  }
});

// Class Modal Functionality
const classData = {
  'weight-lifting': {
    title: 'Weight Lifting',
    image: './assets/images/class-1.jpg',
    description: 'Build strength and muscle with our professional weight training sessions.',
    timing: '7:00 AM - 9:00 PM',
    trainer: 'Kamalesh'
  },
  'cardio-strength': {
    title: 'Cardio & Strength',
    image: './assets/images/class-2.jpg',
    description: 'Improve your endurance and build functional strength.',
    timing: '8:00 AM - 8:00 PM',
    trainer: 'Deva'
  },
  'power-yoga': {
    title: 'Power Yoga',
    image: './assets/images/class-3.jpg',
    description: 'Enhance flexibility, strength, and mental focus.',
    timing: '5:00 AM - 6:30 AM',
    trainer: 'Yamuna'
  },
  'fitness-pack': {
    title: 'The Fitness Pack',
    image: './assets/images/class-4.jpg',
    description: 'Complete fitness package with varied workouts.',
    timing: '8:00 AM - 8:00 PM',
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

if (exploreMoreBtn) {
  exploreMoreBtn.addEventListener('click', function(e) {
    e.preventDefault();
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
}

if (modalCloseBtn) {
  modalCloseBtn.addEventListener('click', function() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
  });
}

if (modalOverlay) {
  modalOverlay.addEventListener('click', function(e) {
    if (e.target === modalOverlay) {
      modalOverlay.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  });
}

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('active')) {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
});

// Toast Notification System
const showToast = function(type, title, message, duration = 4000) {
  const container = document.getElementById('toast-container');
  if (!container) return;
  
  const toast = document.createElement('div');
  toast.className = 'toast ' + type;
  
  let iconName = 'checkmark-circle';
  if (type === 'error') iconName = 'close-circle';
  if (type === 'warning') iconName = 'warning';
  if (type === 'loading') iconName = 'sync';
  
  toast.innerHTML = '<div class="toast-icon"><ion-icon name="' + iconName + '"></ion-icon></div><div class="toast-content"><div class="toast-title">' + title + '</div><div class="toast-message">' + message + '</div></div><button class="toast-close"><ion-icon name="close"></ion-icon></button><div class="toast-progress"></div>';
  
  container.appendChild(toast);
  
  setTimeout(function() {
    toast.classList.add('show');
  }, 10);
  
  var closeBtn = toast.querySelector('.toast-close');
  closeBtn.addEventListener('click', function() {
    removeToast(toast);
  });
  
  var removeToast = function(toastElement) {
    toastElement.classList.add('toast-exit');
    toastElement.classList.remove('show');
    setTimeout(function() {
      toastElement.remove();
    }, 400);
  };
  
  setTimeout(function() {
    removeToast(toast);
  }, duration);
};

// Auth Modal System
const showAuthModal = function(type, title, message, autoClose, redirectUrl) {
  var authModal = document.getElementById('auth-modal');
  var modalIcon = document.getElementById('modal-icon');
  var modalTitleEl = document.getElementById('modal-title');
  var modalMessageEl = document.getElementById('modal-message');
  var modalBtn = document.getElementById('modal-close-btn');
  
  if (!authModal || !modalIcon || !modalTitleEl || !modalMessageEl || !modalBtn) return;
  
  modalTitleEl.textContent = title;
  modalMessageEl.textContent = message;
  
  var iconName = 'checkmark-circle';
  if (type === 'error') iconName = 'close-circle';
  if (type === 'warning') iconName = 'warning';
  if (type === 'loading') iconName = 'sync';
  
  modalIcon.innerHTML = '<ion-icon name="' + iconName + '"></ion-icon>';
  
  authModal.classList.remove('success', 'error', 'loading');
  authModal.classList.add(type);
  authModal.classList.add('active');
  
  var closeModal = function() {
    authModal.classList.remove('active');
    if (redirectUrl) {
      window.location.href = redirectUrl;
    }
  };
  
  modalBtn.onclick = closeModal;
  
  if (autoClose && type === 'success') {
    setTimeout(closeModal, 1500);
  }
};

// Login Page Functionality
document.addEventListener('DOMContentLoaded', function() {
  var loginForm = document.getElementById('login-form');
  var signupForm = document.getElementById('signup-form');
  var successMessage = document.getElementById('success-message');
  var showSignupLink = document.getElementById('show-signup');
  var showLoginLink = document.getElementById('show-login');

  // Create demo user if not exists
  async function createDemoUser() {
    if (!window.db) return;
    
    try {
      var usersRef = window.db.collection("users");
      var snapshot = await usersRef.where("username", "==", "testuser").get();
      
      if (snapshot.empty) {
        await window.db.collection("users").add({
          username: "testuser",
          email: "test@bisonfitness.com",
          password: "test123",
          createdAt: new Date().toISOString()
        });
        console.log("Demo user created");
      }
    } catch (error) {
      console.log("Demo user check:", error.message);
    }
  }
  
  createDemoUser();

  if (loginForm && showSignupLink) {
    showSignupLink.addEventListener('click', function(e) {
      e.preventDefault();
      loginForm.style.display = 'none';
      signupForm.style.display = 'block';
      signupForm.classList.add('active');
    });

    showLoginLink.addEventListener('click', function(e) {
      e.preventDefault();
      signupForm.classList.remove('active');
      setTimeout(function() {
        signupForm.style.display = 'none';
        loginForm.style.display = 'block';
      }, 300);
    });

    // Login Form Submit
    loginForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      var usernameInput = document.getElementById('login-username');
      var passwordInput = document.getElementById('login-password');
      var username = usernameInput.value.trim();
      var password = passwordInput.value;

      // Input validation - Empty fields
      if (!username) {
        showAuthModal('warning', 'Validation Error', 'Please enter your username', false);
        usernameInput.focus();
        return;
      }

      if (!password) {
        showAuthModal('warning', 'Validation Error', 'Please enter your password', false);
        passwordInput.focus();
        return;
      }

      if (!window.db) {
        showAuthModal('error', 'Error', 'Firebase not initialized. Please refresh the page.', false);
        return;
      }

      // Show loading modal
      showAuthModal('loading', 'Logging in', 'Please wait...', false);

      try {
        var usersRef = window.db.collection("users");
        var snapshot = await usersRef.where("username", "==", username).get();
        
        if (snapshot.empty) {
          showAuthModal('error', 'Login Failed', 'Invalid username or password', false);
          return;
        }

        var userFound = false;
        var userData = null;
        
        snapshot.forEach(function(doc) {
          var data = doc.data();
          if (data.password === password) {
            userFound = true;
            userData = data;
          }
        });

        if (userFound) {
          // Store user data
          localStorage.setItem('currentUser', JSON.stringify(userData));
          
          // Show success modal and redirect to homepage
          showAuthModal('success', 'Login Successful!', 'Welcome to Bison Fitness Club!', true, 'index.html');
        } else {
          showAuthModal('error', 'Login Failed', 'Invalid username or password', false);
        }
      } catch (error) {
        console.error("Error logging in: ", error);
        showAuthModal('error', 'Error', 'Login failed. Please try again!', false);
      }
    });

    // Sign Up Form Submit
    signupForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      var usernameInput = document.getElementById('signup-username');
      var emailInput = document.getElementById('signup-email');
      var passwordInput = document.getElementById('signup-password');
      var confirmPasswordInput = document.getElementById('signup-confirm-password');
      
      var username = usernameInput.value.trim();
      var email = emailInput.value.trim();
      var password = passwordInput.value;
      var confirmPassword = confirmPasswordInput.value;

      // Input validation - Empty fields
      if (!username) {
        showAuthModal('warning', 'Validation Error', 'Please enter a username', false);
        usernameInput.focus();
        return;
      }

      if (!email) {
        showAuthModal('warning', 'Validation Error', 'Please enter your email', false);
        emailInput.focus();
        return;
      }

      // Email format validation
      var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showAuthModal('warning', 'Validation Error', 'Please enter a valid email address', false);
        emailInput.focus();
        return;
      }

      if (!password) {
        showAuthModal('warning', 'Validation Error', 'Please enter a password', false);
        passwordInput.focus();
        return;
      }

      if (!confirmPassword) {
        showAuthModal('warning', 'Validation Error', 'Please confirm your password', false);
        confirmPasswordInput.focus();
        return;
      }

      if (password !== confirmPassword) {
        showAuthModal('warning', 'Validation Error', 'Passwords do not match', false);
        confirmPasswordInput.value = '';
        confirmPasswordInput.focus();
        return;
      }

      if (password.length < 6) {
        showAuthModal('warning', 'Validation Error', 'Password must be at least 6 characters', false);
        passwordInput.value = '';
        confirmPasswordInput.value = '';
        passwordInput.focus();
        return;
      }

      if (!window.db) {
        showAuthModal('error', 'Error', 'Firebase not initialized. Please refresh the page.', false);
        return;
      }

      // Show loading modal
      showAuthModal('loading', 'Creating Account', 'Please wait...', false);

      try {
        var usersRef = window.db.collection("users");
        var snapshot = await usersRef.where("username", "==", username).get();
        
        if (!snapshot.empty) {
          showAuthModal('error', 'Registration Failed', 'Username already exists', false);
          return;
        }

        var docRef = await window.db.collection("users").add({
          username: username,
          email: email,
          password: password,
          createdAt: new Date().toISOString()
        });

        console.log("User registered with ID: ", docRef.id);
        
        // Show success modal
        showAuthModal('success', 'Registration Successful!', 'Welcome to Bison Fitness Club!', true);
        
        // Clear form and switch to login
        setTimeout(function() {
          signupForm.reset();
          signupForm.style.display = 'none';
          loginForm.style.display = 'block';
        }, 1500);
        
      } catch (error) {
        console.error("Error registering user: ", error);
        showAuthModal('error', 'Registration Failed', 'Please try again later', false);
      }
    });
  }
});

// Logout Functionality
document.addEventListener('DOMContentLoaded', function() {
  const logoutLink = document.getElementById('logout-link');
  
  if (logoutLink) {
    logoutLink.addEventListener('click', function(e) {
      e.preventDefault();
      localStorage.removeItem('currentUser');
      window.location.href = 'login.html';
    });
  }
});
