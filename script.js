/* ============================================
   BACKGROUND 3D SQUARES ANIMATION
   Creates animated floating squares in the background
============================================ */
function create3DSquares() {
  const canvas = document.getElementById("background-canvas");
  if (!canvas) return;
  
  canvas.innerHTML = "";
  const W = window.innerWidth;
  const H = window.innerHeight;
  
  // Responsive number of squares based on screen size
  const nBoxes = W < 768 ? 6 : W < 1024 ? 12 : 20;
  
  for (let i = 0; i < nBoxes; i++) {
    const div = document.createElement("div");
    div.className = "square-3d";
    
    // Random position
    const left = Math.random() * (W - 120);
    const top = Math.random() * (H - 120);
    div.style.left = left + "px";
    div.style.top = top + "px";
    
    // Random size
    const size = 40 + Math.random() * 100;
    div.style.width = div.style.height = size + "px";
    
    // Random rotation
    const rotX = Math.random() * 60 - 30;
    const rotY = Math.random() * 60 - 30;
    const rotZ = Math.random() * 360;
    
    div.style.transform = `perspective(400px) rotateX(${rotX}deg) rotateY(${rotY}deg) rotateZ(${rotZ}deg)`;
    
    // Random animation duration and delay
    const duration = 12 + Math.random() * 10;
    const delay = Math.random() * 5;
    
    // Animation keyframes
    const keyframes = [
      { 
        transform: `perspective(400px) rotateX(${rotX}deg) rotateY(${rotY}deg) rotateZ(${rotZ}deg) translate(0,0)`,
        opacity: 0.8
      },
      { 
        transform: `perspective(400px) rotateX(${rotX + 30}deg) rotateY(${rotY + 40}deg) rotateZ(${rotZ + 180}deg) translate(50px,70px)`,
        opacity: 0.6
      },
      { 
        transform: `perspective(400px) rotateX(${rotX}deg) rotateY(${rotY}deg) rotateZ(${rotZ + 360}deg) translate(0,0)`,
        opacity: 0.8
      },
    ];
    
    div.animate(keyframes, {
      duration: duration * 1000,
      iterations: Infinity,
      direction: "alternate",
      easing: "ease-in-out",
      delay: delay * 1000,
    });
    
    canvas.appendChild(div);
  }
}

/* ============================================
   HEADER SCROLL EFFECT
   Adds shadow and changes background on scroll
============================================ */
function initHeaderScroll() {
  const header = document.getElementById('header');
  if (!header) return;
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/* ============================================
   MOBILE MENU TOGGLE
   Handle hamburger menu for mobile devices
============================================ */
function initMobileMenu() {
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  
  if (!menuToggle || !navLinks) return;

  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  // Close menu when clicking on a link
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });
}

/* ============================================
   USER DROPDOWN MENU
   Toggle user profile dropdown
============================================ */
function toggleUserDropdown() {
  const dropdown = document.getElementById('userDropdown');
  if (dropdown) {
    dropdown.classList.toggle('active');
  }
}

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
  const userMenu = document.getElementById('userMenu');
  const dropdown = document.getElementById('userDropdown');
  
  if (userMenu && dropdown && !userMenu.contains(e.target)) {
    dropdown.classList.remove('active');
  }
});

/* ============================================
   MODAL FUNCTIONS
   Open, close, and switch between modals
============================================ */
function openLoginModal() {
  document.getElementById('loginModal').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function openSignupModal() {
  document.getElementById('signupModal').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
}

function switchToSignup() {
  closeModal('loginModal');
  setTimeout(() => openSignupModal(), 300);
}

function switchToLogin() {
  closeModal('signupModal');
  setTimeout(() => openLoginModal(), 300);
}

// Close modal when clicking outside
function initModalCloseOnOutsideClick() {
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        closeModal(overlay.id);
      }
    });
  });
}

/* ============================================
   SKILL TAG SELECTION
   Toggle skill selection for preferences
============================================ */
function toggleSkill(element) {
  element.classList.toggle('selected');
}

/* ============================================
   INPUT VALIDATION FUNCTIONS
   Validate email and password inputs
============================================ */
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePassword(password) {
  return password.length >= 8;
}

function getPasswordStrength(password) {
  let strength = 0;
  if (password.length >= 8) strength++;
  if (password.length >= 12) strength++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
  if (/\d/.test(password)) strength++;
  if (/[^a-zA-Z0-9]/.test(password)) strength++;
  
  if (strength <= 2) return { level: 'weak', text: 'Weak', color: '#dc2626' };
  if (strength <= 3) return { level: 'medium', text: 'Medium', color: '#f59e0b' };
  return { level: 'strong', text: 'Strong', color: '#16a34a' };
}

function showError(inputId, message) {
  const input = document.getElementById(inputId);
  if (!input) return;
  
  // Remove existing error
  const existingError = input.parentElement.querySelector('.error-message');
  if (existingError) existingError.remove();
  
  // Add error styling
  input.style.borderColor = '#dc2626';
  
  // Create error message
  const errorDiv = document.createElement('div');
  errorDiv.className = 'error-message';
  errorDiv.style.cssText = 'color: #dc2626; font-size: 0.85rem; margin-top: 0.5rem;';
  errorDiv.textContent = message;
  
  input.parentElement.appendChild(errorDiv);
}

function clearError(inputId) {
  const input = document.getElementById(inputId);
  if (!input) return;
  
  input.style.borderColor = '';
  const errorDiv = input.parentElement.querySelector('.error-message');
  if (errorDiv) errorDiv.remove();
}

/* ============================================
   FORM HANDLERS
   Handle login, signup, and preferences forms
============================================ */
function handleLogin(event) {
  event.preventDefault();
  
  const emailInput = document.getElementById('loginEmail');
  const passwordInput = document.getElementById('loginPassword');
  const btn = event.target.querySelector('.btn-primary');
  
  if (!emailInput || !passwordInput) return;
  
  const email = emailInput.value.trim();
  const password = passwordInput.value;
  
  // Clear previous errors
  clearError('loginEmail');
  clearError('loginPassword');
  
  // Validate inputs
  if (!email) {
    showError('loginEmail', 'Email is required');
    return;
  }
  
  if (!validateEmail(email)) {
    showError('loginEmail', 'Please enter a valid email address');
    return;
  }
  
  if (!password) {
    showError('loginPassword', 'Password is required');
    return;
  }
  
  // Show loading state
  btn.textContent = 'Logging in...';
  btn.disabled = true;
  
  setTimeout(() => {
    try {
      // Check if user exists in localStorage
      const storedUser = localStorage.getItem('userData');
      
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        
        if (userData.email === email) {
          // Mark user as logged in
          localStorage.setItem('isLoggedIn', 'true');
          
          closeModal('loginModal');
          
          // Update UI to show logged in state
          updateUIForLoggedInUser();
          
          showToast('Login successful!');
          
          // Redirect to profile page
          setTimeout(() => {
            window.location.href = 'profile.html';
          }, 500);
        } else {
          showError('loginPassword', 'Invalid email or password');
        }
      } else {
        showError('loginEmail', 'No account found. Please sign up first');
      }
    } catch (error) {
      console.error('Login error:', error);
      showError('loginEmail', 'An error occurred. Please try again');
    } finally {
      btn.textContent = 'Log In';
      btn.disabled = false;
    }
  }, 1500);
}

function handleSignup(event) {
  event.preventDefault();
  
  // Get form data
  const fullName = document.getElementById('fullName').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  
  // Clear previous errors
  clearError('fullName');
  clearError('email');
  clearError('password');
  
  // Validate inputs
  if (!fullName) {
    showError('fullName', 'Full name is required');
    return;
  }
  
  if (fullName.length < 2) {
    showError('fullName', 'Name must be at least 2 characters');
    return;
  }
  
  if (!email) {
    showError('email', 'Email is required');
    return;
  }
  
  if (!validateEmail(email)) {
    showError('email', 'Please enter a valid email address');
    return;
  }
  
  if (!password) {
    showError('password', 'Password is required');
    return;
  }
  
  if (!validatePassword(password)) {
    showError('password', 'Password must be at least 8 characters');
    return;
  }
  
  // Check password strength
  const strength = getPasswordStrength(password);
  if (strength.level === 'weak') {
    showError('password', 'Password is too weak. Add uppercase, numbers, or special characters');
    return;
  }
  
  // Simulate signup process
  const btn = event.target.querySelector('.btn-primary');
  btn.textContent = 'Creating Account...';
  btn.disabled = true;
  
  setTimeout(() => {
    try {
      // Check if email already exists
      const existingUser = localStorage.getItem('userData');
      if (existingUser) {
        const userData = JSON.parse(existingUser);
        if (userData.email === email) {
          showError('email', 'This email is already registered');
          btn.textContent = 'Sign Up';
          btn.disabled = false;
          return;
        }
      }
      
      // Store user data (in production, password should be hashed)
      localStorage.setItem('userData', JSON.stringify({ 
        fullName, 
        email,
        passwordHash: btoa(password), // Simple encoding for demo (NOT secure for production)
        createdAt: new Date().toISOString()
      }));
      
      showToast('Account created successfully!');
      
      // Close signup modal and open preferences modal
      closeModal('signupModal');
      setTimeout(() => {
        document.getElementById('preferencesModal').classList.add('active');
      }, 300);
      
      btn.textContent = 'Sign Up';
      btn.disabled = false;
      event.target.reset();
    } catch (error) {
      console.error('Signup error:', error);
      showError('email', 'An error occurred. Please try again');
      btn.textContent = 'Sign Up';
      btn.disabled = false;
    }
  }, 1500);
}

function handlePreferences(event) {
  event.preventDefault();
  
  // Get selected skills
  const teachSkills = Array.from(document.querySelectorAll('#teachSkills .skill-tag.selected'))
    .map(tag => tag.textContent.trim());
  const learnSkills = Array.from(document.querySelectorAll('#learnSkills .skill-tag.selected'))
    .map(tag => tag.textContent.trim());
  const bio = document.getElementById('bio').value.trim();
  
  // Validate at least one skill selected
  if (teachSkills.length === 0) {
    showToast('Please select at least one skill to teach');
    return;
  }
  
  if (learnSkills.length === 0) {
    showToast('Please select at least one skill to learn');
    return;
  }
  
  // Simulate saving preferences
  const btn = event.target.querySelector('.btn-primary');
  btn.textContent = 'Saving...';
  btn.disabled = true;
  
  setTimeout(() => {
    try {
      // Store preferences
      const userData = JSON.parse(localStorage.getItem('userData') || '{}');
      userData.teachSkills = teachSkills;
      userData.learnSkills = learnSkills;
      userData.bio = bio || 'Passionate learner and teacher. Excited to connect with others!';
      userData.profileComplete = true;
      userData.updatedAt = new Date().toISOString();
      localStorage.setItem('userData', JSON.stringify(userData));
      
      // Mark user as logged in
      localStorage.setItem('isLoggedIn', 'true');
      
      showToast('Profile setup complete!');
      
      // Close preferences modal and show success
      closeModal('preferencesModal');
      setTimeout(() => {
        document.getElementById('successModal').classList.add('active');
      }, 300);
      
      btn.textContent = 'Complete Setup';
      btn.disabled = false;
      event.target.reset();
      
      // Reset skill selections
      document.querySelectorAll('.skill-tag.selected').forEach(tag => {
        tag.classList.remove('selected');
      });
    } catch (error) {
      console.error('Preferences save error:', error);
      showToast('An error occurred. Please try again');
      btn.textContent = 'Complete Setup';
      btn.disabled = false;
    }
  }, 1500);
}

/* ============================================
   GO TO DASHBOARD
   Navigate to profile page after success
============================================ */
function goToDashboard() {
  closeModal('successModal');
  setTimeout(() => {
    window.location.href = 'profile.html';
  }, 300);
}

/* ============================================
   UPDATE UI FOR LOGGED IN USER
   Show user menu instead of login/signup buttons
============================================ */
function updateUIForLoggedInUser() {
  const authButtons = document.getElementById('authButtons');
  const userMenu = document.getElementById('userMenu');
  
  if (authButtons && userMenu) {
    authButtons.style.display = 'none';
    userMenu.style.display = 'block';
    
    // Set user initials
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    const initials = userData.fullName
      ? userData.fullName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
      : 'U';
    
    const userInitials = document.getElementById('userInitials');
    if (userInitials) {
      userInitials.textContent = initials;
    }
  }
}

/* ============================================
   LOGOUT FUNCTION
   Clear user data and update UI
============================================ */
function logout() {
  if (confirm('Are you sure you want to logout?')) {
    localStorage.removeItem('isLoggedIn');
    
    const authButtons = document.getElementById('authButtons');
    const userMenu = document.getElementById('userMenu');
    
    if (authButtons && userMenu) {
      authButtons.style.display = 'flex';
      userMenu.style.display = 'none';
    }
    
    // Redirect to home if on profile page
    if (window.location.pathname.includes('profile.html')) {
      window.location.href = 'index.html';
    }
  }
}

/* ============================================
   CHECK LOGIN STATUS
   Check if user is logged in and update UI accordingly
============================================ */
function checkLoginStatus() {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  
  if (isLoggedIn) {
    updateUIForLoggedInUser();
  }
}

/* ============================================
   SMOOTH SCROLL FOR ANCHOR LINKS
   Smooth scrolling for navigation links
============================================ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      
      // Skip if it's just "#"
      if (href === '#') {
        e.preventDefault();
        return;
      }
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

/* ============================================
   LOAD PROFILE DATA
   Load and display user profile information
============================================ */
function loadProfileData() {
  // Check if we're on the profile page
  if (!document.querySelector('.profile-container')) return;
  
  try {
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    
    if (!userData.fullName) {
      // No user data, redirect to home
      console.warn('No user data found, redirecting to home');
      window.location.href = 'index.html';
      return;
    }
  
  // Update profile header
  const profileName = document.getElementById('profileName');
  const profileEmail = document.getElementById('profileEmail');
  const profileAvatar = document.getElementById('profileAvatar');
  
  if (profileName) profileName.textContent = userData.fullName;
  if (profileEmail) profileEmail.textContent = userData.email;
  
  if (profileAvatar) {
    const initials = userData.fullName
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
    profileAvatar.textContent = initials;
  }
  
  // Update user menu initials
  const userInitials = document.getElementById('userInitials');
  if (userInitials) {
    const initials = userData.fullName
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
    userInitials.textContent = initials;
  }
  
  // Update skills to teach
  const teachSkillsList = document.getElementById('teachSkillsList');
  if (teachSkillsList && userData.teachSkills) {
    teachSkillsList.innerHTML = userData.teachSkills
      .map(skill => `<div class="skill-item">${skill}</div>`)
      .join('');
  }
  
  // Update skills to learn
  const learnSkillsList = document.getElementById('learnSkillsList');
  if (learnSkillsList && userData.learnSkills) {
    learnSkillsList.innerHTML = userData.learnSkills
      .map(skill => `<div class="skill-item">${skill}</div>`)
      .join('');
  }
  
  // Update bio
  const profileBio = document.getElementById('profileBio');
  if (profileBio && userData.bio) {
    profileBio.textContent = userData.bio;
  }
  } catch (error) {
    console.error('Error loading profile data:', error);
    showToast('Error loading profile. Please try logging in again.');
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 2000);
  }
}

/* ============================================
   EDIT PROFILE
   Open modal to edit profile (placeholder for future functionality)
============================================ */
function editProfile() {
  alert('Edit profile functionality coming soon!');
}

/* ============================================
   INITIALIZE ALL FUNCTIONS
   Run when DOM is loaded
============================================ */
document.addEventListener('DOMContentLoaded', () => {
  // Initialize background animation
  create3DSquares();
  window.addEventListener("resize", create3DSquares);
  
  // Initialize header scroll effect
  initHeaderScroll();
  
  // Initialize mobile menu
  initMobileMenu();
  
  // Initialize modal close on outside click
  initModalCloseOnOutsideClick();
  
  // Initialize smooth scroll
  initSmoothScroll();
  
  // Check login status
  checkLoginStatus();
  
  // Load profile data if on profile page
  loadProfileData();
});

/* ============================================
   EXPORT FUNCTIONS FOR INLINE USE
   Make functions available globally
============================================ */
window.openLoginModal = openLoginModal;
window.openSignupModal = openSignupModal;
window.closeModal = closeModal;
window.switchToSignup = switchToSignup;
window.switchToLogin = switchToLogin;
window.toggleSkill = toggleSkill;
window.handleLogin = handleLogin;
window.handleSignup = handleSignup;
window.handlePreferences = handlePreferences;
window.goToDashboard = goToDashboard;
window.logout = logout;
window.editProfile = editProfile;
window.toggleUserDropdown = toggleUserDropdown;



/* ============================================
   TOGGLE EMAIL NOTIFICATIONS
   Handle notification preferences
============================================ */
function toggleNotifications(checkbox) {
  const isEnabled = checkbox.checked;
  
  // Store preference in localStorage
  localStorage.setItem('emailNotifications', isEnabled);
  
  // Show confirmation message
  const message = isEnabled 
    ? 'Email notifications enabled!' 
    : 'Email notifications disabled.';
  
  // Create a temporary toast notification
  showToast(message);
}

/* ============================================
   SHOW TOAST NOTIFICATION
   Display temporary message to user
============================================ */
function showToast(message) {
  // Remove existing toast if any
  const existingToast = document.querySelector('.toast-notification');
  if (existingToast) {
    existingToast.remove();
  }
  
  // Create toast element
  const toast = document.createElement('div');
  toast.className = 'toast-notification';
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    background: linear-gradient(135deg, var(--primary), var(--accent));
    color: white;
    padding: 1rem 1.5rem;
    border-radius: var(--radius);
    box-shadow: 0 8px 24px -4px rgba(0,0,0,0.3);
    z-index: 10000;
    animation: slideInUp 0.3s ease;
    font-weight: 600;
  `;
  
  document.body.appendChild(toast);
  
  // Remove after 3 seconds
  setTimeout(() => {
    toast.style.animation = 'slideOutDown 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

/* ============================================
   DELETE ACCOUNT
   Handle account deletion
============================================ */
function deleteAccount() {
  if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
    if (confirm('This will permanently delete all your data. Are you absolutely sure?')) {
      // Clear all user data
      localStorage.clear();
      
      // Show success message
      showToast('Account deleted successfully.');
      
      // Redirect to home page after 2 seconds
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 2000);
    }
  }
}

/* ============================================
   LOAD NOTIFICATION PREFERENCE
   Load saved notification preference on page load
============================================ */
function loadNotificationPreference() {
  const notificationsEnabled = localStorage.getItem('emailNotifications');
  const checkbox = document.getElementById('emailNotifications');
  
  if (checkbox) {
    // Default to true if not set
    checkbox.checked = notificationsEnabled === null ? true : notificationsEnabled === 'true';
  }
}

// Update the DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', () => {
  // ...existing code...
  
  // Load notification preference
  loadNotificationPreference();
});

// Export new functions
window.toggleNotifications = toggleNotifications;
window.deleteAccount = deleteAccount;