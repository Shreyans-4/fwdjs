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

// Basic API helper state
const API_BASE = '';
let currentUser = null;

// Build initials for avatars
function getInitialsFromName(name = '') {
  return name
    .split(' ')
    .filter(Boolean)
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) || 'U';
}

// Generic JSON API wrapper with consistent error handling
async function apiRequest(path, options = {}) {
  const mergedOptions = {
    method: options.method || 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    credentials: 'include',
    body: options.body,
  };
  
  if (['GET', 'HEAD'].includes(mergedOptions.method)) {
    delete mergedOptions.body;
  }
  
  const response = await fetch(`${API_BASE}${path}`, mergedOptions);
  const data = await response.json().catch(() => ({}));
  
  if (!response.ok) {
    const message = data.message || 'Request failed';
    throw new Error(message);
  }
  
  return data;
}

async function fetchCurrentUser() {
  try {
    const data = await apiRequest('/api/me');
    currentUser = data.user;
    return currentUser;
  } catch (err) {
    currentUser = null;
    return null;
  }
}

/* ============================================
   MODAL FUNCTIONS
   Open, close, and switch between modals
============================================ */
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  } else {
    console.error('Modal not found:', modalId);
  }
}

function openLoginModal() {
  openModal('loginModal');
}

function openSignupModal() {
  openModal('signupModal');
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
async function handleLogin(event) {
  event.preventDefault();
  
  const emailInput = document.getElementById('loginEmail');
  const passwordInput = document.getElementById('loginPassword');
  const btn = event.target.querySelector('.btn-primary');
  
  if (!emailInput || !passwordInput) return;
  
  const email = emailInput.value.trim();
  const password = passwordInput.value;
  
  clearError('loginEmail');
  clearError('loginPassword');
  
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
  
  btn.textContent = 'Logging in...';
  btn.disabled = true;
  
  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, password })
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      showError('loginPassword', data.message || 'Invalid email or password');
      btn.textContent = 'Log In';
      btn.disabled = false;
      return;
    }
    
    // Set current user from backend response with ALL data
    currentUser = {
      id: data.user.id,
      name: data.user.fullName,
      fullName: data.user.fullName,
      email: data.user.email,
      teachSkills: data.user.teachSkills || [],
      learnSkills: data.user.learnSkills || [],
      bio: data.user.bio || ''
    };
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    
    closeModal('loginModal');
    updateUIForLoggedInUser(currentUser);
    showToast('Login successful!');
    
    setTimeout(() => {
      window.location.href = 'profile.html';
    }, 500);
  } catch (error) {
    const message = error?.message || 'An error occurred. Please try again';
    showError('loginPassword', message);
  } finally {
    btn.textContent = 'Log In';
    btn.disabled = false;
  }
}

async function handleSignup(event) {
  event.preventDefault();
  
  const fullName = document.getElementById('fullName').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  
  clearError('fullName');
  clearError('email');
  clearError('password');
  
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
  
  const strength = getPasswordStrength(password);
  if (strength.level === 'weak') {
    showError('password', 'Password is too weak. Add uppercase, numbers, or special characters');
    return;
  }
  
  const btn = event.target.querySelector('.btn-primary');
  btn.textContent = 'Creating Account...';
  btn.disabled = true;
  
  try {
    const response = await fetch('/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ fullName, email, password })
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      showError('email', data.message || 'An error occurred');
      btn.textContent = 'Sign Up';
      btn.disabled = false;
      return;
    }
    
    // Set current user from backend response with ALL data
    currentUser = {
      id: data.user.id,
      name: data.user.fullName,
      fullName: data.user.fullName,
      email: data.user.email,
      teachSkills: data.user.teachSkills || [],
      learnSkills: data.user.learnSkills || [],
      bio: data.user.bio || ''
    };
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    
    console.log('Signup successful, user data:', currentUser);
    showToast('Account created successfully!');
    closeModal('signupModal');
    
    // Open preferences modal after a short delay
    setTimeout(() => {
      console.log('Opening preferences modal...');
      const prefsModal = document.getElementById('preferencesModal');
      if (prefsModal) {
        openModal('preferencesModal');
      } else {
        console.error('Preferences modal not found! Redirecting to profile...');
        setTimeout(() => {
          window.location.href = 'profile.html';
        }, 500);
      }
    }, 300);
    
    event.target.reset();
  } catch (error) {
    const message = error?.message || 'An error occurred. Please try again';
    showError('email', message);
  } finally {
    btn.textContent = 'Sign Up';
    btn.disabled = false;
  }
}

async function handlePreferences(event) {
  event.preventDefault();
  
  const teachSkills = Array.from(document.querySelectorAll('#teachSkills .skill-tag.selected'))
    .map(tag => tag.textContent.trim());
  const learnSkills = Array.from(document.querySelectorAll('#learnSkills .skill-tag.selected'))
    .map(tag => tag.textContent.trim());
  const bio = document.getElementById('bio').value.trim();
  
  if (teachSkills.length === 0) {
    showToast('Please select at least one skill to teach');
    return;
  }
  
  if (learnSkills.length === 0) {
    showToast('Please select at least one skill to learn');
    return;
  }
  
  const btn = event.target.querySelector('.btn-primary');
  btn.textContent = 'Saving...';
  btn.disabled = true;
  
  try {
    const response = await fetch('/api/preferences', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ teachSkills, learnSkills, bio })
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      showToast(data.message || 'Failed to save preferences');
      btn.textContent = 'Complete Setup';
      btn.disabled = false;
      return;
    }
    
    // Update current user with complete saved data
    if (currentUser) {
      currentUser = {
        ...currentUser,
        teachSkills: data.user.teachSkills || teachSkills,
        learnSkills: data.user.learnSkills || learnSkills,
        bio: data.user.bio || bio
      };
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }
    
    showToast('Profile setup complete!');
    closeModal('preferencesModal');
    
    setTimeout(() => {
      openModal('successModal');
    }, 300);
    
    event.target.reset();
    document.querySelectorAll('.skill-tag.selected').forEach(tag => {
      tag.classList.remove('selected');
    });
  } catch (error) {
    const message = error?.message || 'An error occurred. Please try again';
    showToast(message);
  } finally {
    btn.textContent = 'Complete Setup';
    btn.disabled = false;
  }
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
function updateUIForLoggedInUser(userData = currentUser) {
  const authButtons = document.getElementById('authButtons');
  const userMenu = document.getElementById('userMenu');
  
  if (!userData) return;
  
  if (authButtons && userMenu) {
    authButtons.style.display = 'none';
    userMenu.style.display = 'block';
    
    const userInitials = document.getElementById('userInitials');
    if (userInitials) {
      userInitials.textContent = getInitialsFromName(userData.fullName);
    }
  }
}

/* ============================================
   LOGOUT FUNCTION
   Clear user data and update UI
============================================ */
async function logout() {
  if (!confirm('Are you sure you want to logout?')) return;
  
  try {
    await apiRequest('/api/logout', { method: 'POST' });
  } catch (error) {
    console.error('Logout error:', error);
  }
  
  currentUser = null;
  const authButtons = document.getElementById('authButtons');
  const userMenu = document.getElementById('userMenu');
  
  if (authButtons && userMenu) {
    authButtons.style.display = 'flex';
    userMenu.style.display = 'none';
  }
  
  if (window.location.pathname.includes('profile.html')) {
    window.location.href = 'index.html';
  }
}

/* ============================================
   CHECK LOGIN STATUS
   Check if user is logged in and update UI accordingly
============================================ */
async function checkLoginStatus() {
  const user = await fetchCurrentUser();
  if (user) {
    updateUIForLoggedInUser(user);
  } else {
    const authButtons = document.getElementById('authButtons');
    const userMenu = document.getElementById('userMenu');
    if (authButtons && userMenu) {
      authButtons.style.display = 'flex';
      userMenu.style.display = 'none';
    }
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
async function loadProfileData() {
  if (!document.querySelector('.profile-container')) return;
  
  try {
    let userData = await fetchCurrentUser();
    
    // Fallback to localStorage if API fails
    if (!userData) {
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        userData = JSON.parse(storedUser);
        console.log('Using cached user data from localStorage');
      } else {
        console.log('No user data found, redirecting to home');
        window.location.href = 'index.html';
        return;
      }
    }
    
    console.log('Loaded user data:', userData);
  
    const profileName = document.getElementById('profileName');
    const profileEmail = document.getElementById('profileEmail');
    const profileAvatar = document.getElementById('profileAvatar');
    
    if (profileName) profileName.textContent = userData.fullName || userData.name || 'User';
    if (profileEmail) profileEmail.textContent = userData.email || '';
    if (profileAvatar) {
      profileAvatar.textContent = getInitialsFromName(userData.fullName || userData.name);
    }
    
    const userInitials = document.getElementById('userInitials');
    if (userInitials) {
      userInitials.textContent = getInitialsFromName(userData.fullName || userData.name);
    }
    
    const teachSkillsList = document.getElementById('teachSkillsList');
    if (teachSkillsList) {
      if (userData.teachSkills && userData.teachSkills.length > 0) {
        teachSkillsList.innerHTML = userData.teachSkills
          .map(skill => `<div class="skill-item">${skill}</div>`)
          .join('');
      } else {
        teachSkillsList.innerHTML = '<p style="color: var(--muted-foreground); text-align: center;">No skills added yet</p>';
      }
    }
    
    const learnSkillsList = document.getElementById('learnSkillsList');
    if (learnSkillsList) {
      if (userData.learnSkills && userData.learnSkills.length > 0) {
        learnSkillsList.innerHTML = userData.learnSkills
          .map(skill => `<div class="skill-item">${skill}</div>`)
          .join('');
      } else {
        learnSkillsList.innerHTML = '<p style="color: var(--muted-foreground); text-align: center;">No skills added yet</p>';
      }
    }
    
    const profileBio = document.getElementById('profileBio');
    if (profileBio) {
      profileBio.textContent = userData.bio || 'No bio added yet. Click "Edit Profile" to add one!';
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
   Open modal to edit profile and pre-fill with current data
============================================ */
function editProfile() {
  console.log('Edit profile clicked');
  
  try {
    // Check if modal exists
    const modal = document.getElementById('editProfileModal');
    console.log('Modal found:', !!modal);
    
    if (!modal) {
      console.error('Edit profile modal not found in DOM');
      showToast('Profile edit is only available on the profile page');
      return;
    }
    
    // Get user data from localStorage directly (more reliable than API for editing)
    const storedUser = localStorage.getItem('currentUser');
    console.log('Stored user data:', storedUser);
    
    let userData = storedUser ? JSON.parse(storedUser) : null;
    
    if (!userData) {
      console.error('No user data found in localStorage');
      showToast('Please log in to edit your profile');
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 1500);
      return;
    }
    
    console.log('User data loaded:', userData);
    
    // Pre-fill the form with current data
    const editBio = document.getElementById('editBio');
    console.log('Bio field found:', !!editBio);
    if (editBio) {
      editBio.value = userData.bio || '';
      console.log('Bio set to:', userData.bio);
    }
    
    // Pre-select teach skills
    const teachSkillTags = document.querySelectorAll('#editTeachSkills .skill-tag');
    console.log('Found teach skill tags:', teachSkillTags.length);
    
    if (teachSkillTags.length === 0) {
      console.error('No teach skill tags found! Make sure #editTeachSkills container exists');
    }
    
    teachSkillTags.forEach(tag => {
      tag.classList.remove('selected');
      const skillName = tag.textContent.trim();
      if (userData.teachSkills && userData.teachSkills.includes(skillName)) {
        tag.classList.add('selected');
        console.log('Selected teach skill:', skillName);
      }
    });
    
    // Pre-select learn skills
    const learnSkillTags = document.querySelectorAll('#editLearnSkills .skill-tag');
    console.log('Found learn skill tags:', learnSkillTags.length);
    
    if (learnSkillTags.length === 0) {
      console.error('No learn skill tags found! Make sure #editLearnSkills container exists');
    }
    
    learnSkillTags.forEach(tag => {
      tag.classList.remove('selected');
      const skillName = tag.textContent.trim();
      if (userData.learnSkills && userData.learnSkills.includes(skillName)) {
        tag.classList.add('selected');
        console.log('Selected learn skill:', skillName);
      }
    });
    
    console.log('Opening edit profile modal...');
    openModal('editProfileModal');
    console.log('Modal should now be visible');
    
  } catch (error) {
    console.error('Error in editProfile function:', error);
    showToast('Error: ' + error.message);
  }
}

/* ============================================
   HANDLE EDIT PROFILE
   Save updated profile information
============================================ */
async function handleEditProfile(event) {
  event.preventDefault();
  
  const teachSkills = Array.from(document.querySelectorAll('#editTeachSkills .skill-tag.selected'))
    .map(tag => tag.textContent.trim());
  const learnSkills = Array.from(document.querySelectorAll('#editLearnSkills .skill-tag.selected'))
    .map(tag => tag.textContent.trim());
  const bio = document.getElementById('editBio').value.trim();
  
  if (teachSkills.length === 0) {
    showToast('Please select at least one skill to teach');
    return;
  }
  
  if (learnSkills.length === 0) {
    showToast('Please select at least one skill to learn');
    return;
  }
  
  const btn = event.target.querySelector('.btn-primary');
  btn.textContent = 'Saving...';
  btn.disabled = true;
  
  try {
    const response = await fetch('/api/preferences', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ teachSkills, learnSkills, bio })
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      showToast(data.message || 'Failed to save changes');
      btn.textContent = 'Save Changes';
      btn.disabled = false;
      return;
    }
    
    // Update current user in localStorage with complete data
    if (currentUser) {
      currentUser = {
        ...currentUser,
        teachSkills: data.user.teachSkills || teachSkills,
        learnSkills: data.user.learnSkills || learnSkills,
        bio: data.user.bio || bio
      };
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }
    
    showToast('Profile updated successfully!');
    closeModal('editProfileModal');
    
    // Reload profile data to show updated information
    await loadProfileData();
    
  } catch (error) {
    const message = error?.message || 'An error occurred. Please try again';
    showToast(message);
  } finally {
    btn.textContent = 'Save Changes';
    btn.disabled = false;
  }
}

/* ============================================
   INITIALIZE ALL FUNCTIONS
   Run when DOM is loaded
============================================ */
document.addEventListener('DOMContentLoaded', async () => {
  create3DSquares();
  window.addEventListener("resize", create3DSquares);
  
  initHeaderScroll();
  initMobileMenu();
  initModalCloseOnOutsideClick();
  initSmoothScroll();
  
  await checkLoginStatus();
  await loadProfileData();
  loadNotificationPreference();
  
  // Restore active chat if it exists (works across all pages)
  setTimeout(() => {
    restoreActiveChatOnAllPages();
  }, 100);
});

/* ============================================
   RESTORE ACTIVE CHAT ON ALL PAGES
   Restore chat window state from localStorage
============================================ */
function restoreActiveChatOnAllPages() {
  const activeChatUser = localStorage.getItem('activeChatUser');
  const isMinimized = localStorage.getItem('chatMinimized') === 'true';
  
  const chatWindow = document.getElementById('chatWindow');
  const chatMinimized = document.getElementById('chatMinimized');
  
  // Check if chat elements exist on this page
  if (!chatWindow || !chatMinimized) {
    return;
  }
  
  if (activeChatUser) {
    try {
      const user = JSON.parse(activeChatUser);
      console.log('Restoring chat for user:', user.name);
      
      // Update chat header
      const chatAvatar = document.getElementById('chatAvatar');
      const chatUserName = document.getElementById('chatUserName');
      const chatUserStatus = document.getElementById('chatUserStatus');
      
      if (chatAvatar) chatAvatar.textContent = user.initials;
      if (chatUserName) chatUserName.textContent = user.name;
      if (chatUserStatus) {
        chatUserStatus.textContent = user.isOnline ? 'Online' : 'Offline';
        chatUserStatus.style.color = user.isOnline ? '#10b981' : '#9ca3af';
      }
      
      // Update minimized chat info
      const chatMiniAvatar = document.getElementById('chatMiniAvatar');
      const chatMiniName = document.getElementById('chatMiniName');
      
      if (chatMiniAvatar) chatMiniAvatar.textContent = user.initials;
      if (chatMiniName) chatMiniName.textContent = user.name;
      
      // Load messages if function exists
      if (typeof loadChatMessages === 'function') {
        loadChatMessages(user.id);
      }
      
      // Show chat in correct state
      if (isMinimized) {
        chatWindow.classList.remove('active');
        chatMinimized.style.display = 'flex';
        console.log('Chat restored in minimized state');
      } else {
        chatWindow.classList.add('active');
        chatMinimized.style.display = 'none';
        console.log('Chat restored in open state');
      }
    } catch (error) {
      console.error('Error restoring chat:', error);
    }
  }
}

/* ============================================
   EXPORT FUNCTIONS FOR INLINE USE
   Make functions available globally
============================================ */
window.openModal = openModal;
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
window.handleEditProfile = handleEditProfile;
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
async function deleteAccount() {
  if (!confirm('Are you sure you want to delete your account? This action cannot be undone.')) return;
  if (!confirm('This will permanently delete all your data. Are you absolutely sure?')) return;
  
  try {
    await apiRequest('/api/account', { method: 'DELETE' });
    currentUser = null;
    showToast('Account deleted successfully.');
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 1500);
  } catch (error) {
    const message = error?.message || 'Failed to delete account. Please try again.';
    showToast(message);
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

// Export new functions
window.toggleNotifications = toggleNotifications;
window.deleteAccount = deleteAccount;