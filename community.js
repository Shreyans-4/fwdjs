// ================================================
// COMMUNITY PAGE JAVASCRIPT
// ================================================

// Mock user data
const mockUsers = [
  {
    id: 1,
    name: "Alex Johnson",
    initials: "AJ",
    title: "Full Stack Developer & Designer",
    bio: "Passionate about creating beautiful web experiences. I've been coding for 5 years and love teaching others. Looking to improve my photography skills!",
    teachSkills: ["Web Development", "Graphic Design", "UI/UX"],
    learnSkills: ["Photography", "Video Editing"],
    level: "Advanced",
    matchPercentage: 95,
    isPerfectMatch: true,
    isOnline: true,
    isVerified: true,
    connections: 48,
    skillsExchanged: 23,
    rating: 4.9,
    joinedDays: 120
  },
  {
    id: 2,
    name: "Sarah Martinez",
    initials: "SM",
    title: "Professional Photographer",
    bio: "Award-winning photographer specializing in portraits and landscapes. I want to build my own website to showcase my work.",
    teachSkills: ["Photography", "Photo Editing", "Lightroom"],
    learnSkills: ["Web Development", "Marketing"],
    level: "Expert",
    matchPercentage: 92,
    isPerfectMatch: true,
    isOnline: false,
    isVerified: true,
    connections: 67,
    skillsExchanged: 34,
    rating: 4.8,
    joinedDays: 200
  },
  {
    id: 3,
    name: "Michael Chen",
    initials: "MC",
    title: "Digital Marketing Specialist",
    bio: "Helping businesses grow online for 8+ years. Expert in SEO, social media, and content strategy. Want to learn data analysis!",
    teachSkills: ["Marketing", "SEO", "Social Media"],
    learnSkills: ["Data Science", "Python"],
    level: "Expert",
    matchPercentage: 78,
    isPerfectMatch: false,
    isOnline: true,
    isVerified: true,
    connections: 92,
    skillsExchanged: 45,
    rating: 5.0,
    joinedDays: 450
  },
  {
    id: 4,
    name: "Emma Wilson",
    initials: "EW",
    title: "Content Writer & Storyteller",
    bio: "Creative writer with a passion for crafting compelling stories. Published author looking to learn web design to create my blog.",
    teachSkills: ["Writing", "Copywriting", "Storytelling"],
    learnSkills: ["Web Development", "Graphic Design"],
    level: "Intermediate",
    matchPercentage: 85,
    isPerfectMatch: true,
    isOnline: true,
    isVerified: false,
    connections: 34,
    skillsExchanged: 18,
    rating: 4.7,
    joinedDays: 60
  },
  {
    id: 5,
    name: "David Kim",
    initials: "DK",
    title: "Music Producer & Composer",
    bio: "Electronic music producer and composer. I create soundtracks for games and films. Interested in learning video editing!",
    teachSkills: ["Music Production", "Audio Engineering", "Music"],
    learnSkills: ["Video Editing", "Animation"],
    level: "Advanced",
    matchPercentage: 70,
    isPerfectMatch: false,
    isOnline: false,
    isVerified: true,
    connections: 56,
    skillsExchanged: 28,
    rating: 4.9,
    joinedDays: 180
  },
  {
    id: 6,
    name: "Lisa Anderson",
    initials: "LA",
    title: "Fitness Coach & Nutritionist",
    bio: "Certified personal trainer and nutrition expert. Helping people achieve their health goals. Want to expand my reach through social media!",
    teachSkills: ["Fitness", "Nutrition", "Wellness"],
    learnSkills: ["Marketing", "Video Editing"],
    level: "Expert",
    matchPercentage: 82,
    isPerfectMatch: false,
    isOnline: true,
    isVerified: true,
    connections: 78,
    skillsExchanged: 41,
    rating: 4.8,
    joinedDays: 300
  },
  {
    id: 7,
    name: "James Rodriguez",
    initials: "JR",
    title: "Data Scientist & ML Engineer",
    bio: "Working with machine learning and data analysis. Love finding insights in data. Looking to improve my presentation skills!",
    teachSkills: ["Data Science", "Python", "Machine Learning"],
    learnSkills: ["Public Speaking", "Writing"],
    level: "Advanced",
    matchPercentage: 75,
    isPerfectMatch: false,
    isOnline: false,
    isVerified: true,
    connections: 43,
    skillsExchanged: 19,
    rating: 4.6,
    joinedDays: 90
  },
  {
    id: 8,
    name: "Sophia Lee",
    initials: "SL",
    title: "Language Teacher (English & Spanish)",
    bio: "Bilingual teacher passionate about helping others learn languages. Native English speaker, fluent in Spanish. Want to learn graphic design!",
    teachSkills: ["Language", "English", "Spanish"],
    learnSkills: ["Graphic Design", "UI/UX"],
    level: "Expert",
    matchPercentage: 88,
    isPerfectMatch: true,
    isOnline: true,
    isVerified: false,
    connections: 61,
    skillsExchanged: 52,
    rating: 5.0,
    joinedDays: 250
  },
  {
    id: 9,
    name: "Tom Harris",
    initials: "TH",
    title: "Video Content Creator",
    bio: "YouTube content creator with 100K+ subscribers. Expert in video production, editing, and storytelling. Interested in business strategy!",
    teachSkills: ["Video Editing", "Content Creation", "YouTube"],
    learnSkills: ["Business", "Marketing"],
    level: "Advanced",
    matchPercentage: 80,
    isPerfectMatch: false,
    isOnline: true,
    isVerified: true,
    connections: 89,
    skillsExchanged: 38,
    rating: 4.9,
    joinedDays: 400
  },
  {
    id: 10,
    name: "Rachel Green",
    initials: "RG",
    title: "Professional Chef",
    bio: "Culinary arts graduate with 10 years experience. Specialize in Italian and French cuisine. Want to start a cooking blog!",
    teachSkills: ["Cooking", "Baking", "Culinary Arts"],
    learnSkills: ["Web Development", "Photography"],
    level: "Expert",
    matchPercentage: 90,
    isPerfectMatch: true,
    isOnline: false,
    isVerified: true,
    connections: 52,
    skillsExchanged: 31,
    rating: 4.8,
    joinedDays: 150
  },
  {
    id: 11,
    name: "Kevin Patel",
    initials: "KP",
    title: "Business Consultant",
    bio: "Helping startups and small businesses grow. MBA graduate with expertise in strategy and operations. Looking to learn data analytics!",
    teachSkills: ["Business", "Strategy", "Consulting"],
    learnSkills: ["Data Science", "Python"],
    level: "Expert",
    matchPercentage: 73,
    isPerfectMatch: false,
    isOnline: true,
    isVerified: true,
    connections: 95,
    skillsExchanged: 47,
    rating: 4.7,
    joinedDays: 500
  },
  {
    id: 12,
    name: "Nina Kowalski",
    initials: "NK",
    title: "UI/UX Designer",
    bio: "Creating intuitive and beautiful user experiences for mobile and web. Passionate about design systems. Want to learn frontend development!",
    teachSkills: ["UI/UX", "Figma", "Design Systems"],
    learnSkills: ["Web Development", "React"],
    level: "Advanced",
    matchPercentage: 94,
    isPerfectMatch: true,
    isOnline: true,
    isVerified: true,
    connections: 71,
    skillsExchanged: 36,
    rating: 4.9,
    joinedDays: 280
  },
  {
    id: 13,
    name: "Carlos Mendez",
    initials: "CM",
    title: "Animation Artist",
    bio: "2D/3D animator working in games and film. Love bringing characters to life! Looking to expand my skills in motion graphics.",
    teachSkills: ["Animation", "3D Modeling", "Character Design"],
    learnSkills: ["Motion Graphics", "Video Editing"],
    level: "Advanced",
    matchPercentage: 71,
    isPerfectMatch: false,
    isOnline: false,
    isVerified: false,
    connections: 38,
    skillsExchanged: 22,
    rating: 4.6,
    joinedDays: 45
  },
  {
    id: 14,
    name: "Amanda Foster",
    initials: "AF",
    title: "Social Media Manager",
    bio: "Managing social media for brands and influencers. Expert in Instagram, TikTok, and content strategy. Want to learn photography!",
    teachSkills: ["Social Media", "Content Strategy", "Marketing"],
    learnSkills: ["Photography", "Video Editing"],
    level: "Intermediate",
    matchPercentage: 86,
    isPerfectMatch: false,
    isOnline: true,
    isVerified: true,
    connections: 64,
    skillsExchanged: 33,
    rating: 4.8,
    joinedDays: 210
  },
  {
    id: 15,
    name: "Ryan Mitchell",
    initials: "RM",
    title: "Mobile App Developer",
    bio: "iOS and Android developer with 6 years experience. Built apps with millions of downloads. Interested in learning UI/UX design!",
    teachSkills: ["Mobile Development", "Swift", "Kotlin"],
    learnSkills: ["UI/UX", "Design"],
    level: "Advanced",
    matchPercentage: 89,
    isPerfectMatch: true,
    isOnline: true,
    isVerified: true,
    connections: 55,
    skillsExchanged: 29,
    rating: 4.7,
    joinedDays: 190
  },
  {
    id: 16,
    name: "Olivia Brown",
    initials: "OB",
    title: "Voice Actor & Narrator",
    bio: "Professional voice over artist for commercials, audiobooks, and animation. Want to create my own content and learn video editing!",
    teachSkills: ["Voice Acting", "Audio Recording", "Music"],
    learnSkills: ["Video Editing", "Content Creation"],
    level: "Intermediate",
    matchPercentage: 77,
    isPerfectMatch: false,
    isOnline: false,
    isVerified: false,
    connections: 29,
    skillsExchanged: 15,
    rating: 4.5,
    joinedDays: 30
  },
  {
    id: 17,
    name: "Daniel Park",
    initials: "DP",
    title: "Cybersecurity Expert",
    bio: "Ethical hacker and security consultant. Protecting businesses from cyber threats. Looking to improve my communication skills!",
    teachSkills: ["Cybersecurity", "Network Security", "Ethical Hacking"],
    learnSkills: ["Public Speaking", "Writing"],
    level: "Expert",
    matchPercentage: 68,
    isPerfectMatch: false,
    isOnline: true,
    isVerified: true,
    connections: 47,
    skillsExchanged: 21,
    rating: 4.9,
    joinedDays: 330
  },
  {
    id: 18,
    name: "Jessica Taylor",
    initials: "JT",
    title: "Yoga Instructor & Wellness Coach",
    bio: "Certified yoga teacher helping people find balance and peace. Passionate about holistic wellness. Want to grow my online presence!",
    teachSkills: ["Yoga", "Meditation", "Wellness"],
    learnSkills: ["Social Media", "Web Development"],
    level: "Advanced",
    matchPercentage: 84,
    isPerfectMatch: false,
    isOnline: true,
    isVerified: true,
    connections: 73,
    skillsExchanged: 39,
    rating: 5.0,
    joinedDays: 270
  },
  {
    id: 19,
    name: "Mark Stevens",
    initials: "MS",
    title: "Podcast Host & Producer",
    bio: "Running a successful podcast about technology and entrepreneurship. Expert in audio production. Interested in video content!",
    teachSkills: ["Podcasting", "Audio Production", "Interviewing"],
    learnSkills: ["Video Editing", "YouTube"],
    level: "Advanced",
    matchPercentage: 79,
    isPerfectMatch: false,
    isOnline: false,
    isVerified: true,
    connections: 82,
    skillsExchanged: 44,
    rating: 4.8,
    joinedDays: 360
  },
  {
    id: 20,
    name: "Isabella Garcia",
    initials: "IG",
    title: "Fashion Designer",
    bio: "Independent fashion designer creating sustainable clothing. Love working with fabrics and colors. Want to learn digital marketing!",
    teachSkills: ["Fashion Design", "Sewing", "Styling"],
    learnSkills: ["Marketing", "Social Media"],
    level: "Intermediate",
    matchPercentage: 81,
    isPerfectMatch: false,
    isOnline: true,
    isVerified: false,
    connections: 41,
    skillsExchanged: 24,
    rating: 4.7,
    joinedDays: 110
  },
  {
    id: 21,
    name: "Chris Thompson",
    initials: "CT",
    title: "Game Developer",
    bio: "Indie game developer creating unique gaming experiences. Proficient in Unity and Unreal Engine. Looking to learn 3D modeling!",
    teachSkills: ["Game Development", "Unity", "Programming"],
    learnSkills: ["3D Modeling", "Animation"],
    level: "Advanced",
    matchPercentage: 76,
    isPerfectMatch: false,
    isOnline: true,
    isVerified: true,
    connections: 58,
    skillsExchanged: 27,
    rating: 4.6,
    joinedDays: 220
  },
  {
    id: 22,
    name: "Megan Clark",
    initials: "MC",
    title: "Interior Designer",
    bio: "Creating beautiful and functional spaces. Specializing in residential and small commercial projects. Want to showcase my work online!",
    teachSkills: ["Interior Design", "3D Visualization", "Design"],
    learnSkills: ["Web Development", "Photography"],
    level: "Intermediate",
    matchPercentage: 87,
    isPerfectMatch: true,
    isOnline: false,
    isVerified: true,
    connections: 49,
    skillsExchanged: 26,
    rating: 4.8,
    joinedDays: 140
  },
  {
    id: 23,
    name: "Brandon Lee",
    initials: "BL",
    title: "E-commerce Specialist",
    bio: "Helping businesses succeed online through Shopify and Amazon. Expert in product listings and conversion optimization. Want to learn graphic design!",
    teachSkills: ["E-commerce", "Shopify", "Business"],
    learnSkills: ["Graphic Design", "UI/UX"],
    level: "Advanced",
    matchPercentage: 83,
    isPerfectMatch: false,
    isOnline: true,
    isVerified: true,
    connections: 66,
    skillsExchanged: 35,
    rating: 4.7,
    joinedDays: 260
  },
  {
    id: 24,
    name: "Natalie White",
    initials: "NW",
    title: "Freelance Illustrator",
    bio: "Creating whimsical illustrations for books, brands, and editorial. Love bringing imagination to life. Interested in animation!",
    teachSkills: ["Illustration", "Drawing", "Digital Art"],
    learnSkills: ["Animation", "Motion Graphics"],
    level: "Intermediate",
    matchPercentage: 74,
    isPerfectMatch: false,
    isOnline: true,
    isVerified: false,
    connections: 36,
    skillsExchanged: 20,
    rating: 4.9,
    joinedDays: 75
  }
];

let filteredUsers = [...mockUsers];
let currentFilter = 'all';
let displayedUsersCount = 12;

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
  renderUsers();
  updateResultsCount();
  
  // Check if user is logged in
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  if (currentUser) {
    document.getElementById('authButtons').style.display = 'none';
    document.getElementById('userMenu').style.display = 'block';
    const initials = currentUser.name.split(' ').map(n => n[0]).join('');
    document.getElementById('userInitials').textContent = initials;
  }
});

// Toggle filters panel
function toggleFilters() {
  const panel = document.getElementById('filtersPanel');
  panel.classList.toggle('active');
}

// Filter users based on search and filters
function filterUsers() {
  const searchTerm = document.getElementById('searchInput').value.toLowerCase();
  const teachFilter = document.getElementById('teachFilter').value;
  const learnFilter = document.getElementById('learnFilter').value;
  const levelFilter = document.getElementById('levelFilter').value;
  
  filteredUsers = mockUsers.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm) ||
      user.bio.toLowerCase().includes(searchTerm) ||
      user.teachSkills.some(skill => skill.toLowerCase().includes(searchTerm)) ||
      user.learnSkills.some(skill => skill.toLowerCase().includes(searchTerm));
    
    const matchesTeach = !teachFilter || user.teachSkills.includes(teachFilter);
    const matchesLearn = !learnFilter || user.learnSkills.includes(learnFilter);
    const matchesLevel = !levelFilter || user.level === levelFilter;
    
    return matchesSearch && matchesTeach && matchesLearn && matchesLevel;
  });
  
  // Apply current quick filter
  if (currentFilter !== 'all') {
    applyQuickFilter(currentFilter);
  }
  
  displayedUsersCount = 12;
  renderUsers();
  updateResultsCount();
  checkEmptyState();
}

// Sort users
function sortUsers() {
  const sortValue = document.getElementById('sortFilter').value;
  
  switch(sortValue) {
    case 'match':
      filteredUsers.sort((a, b) => b.matchPercentage - a.matchPercentage);
      break;
    case 'recent':
      filteredUsers.sort((a, b) => a.joinedDays - b.joinedDays);
      break;
    case 'popular':
      filteredUsers.sort((a, b) => b.connections - a.connections);
      break;
    case 'alphabetical':
      filteredUsers.sort((a, b) => a.name.localeCompare(b.name));
      break;
  }
  
  renderUsers();
}

// Quick filter
function quickFilter(type) {
  currentFilter = type;
  
  // Update active chip
  document.querySelectorAll('.chip').forEach(chip => {
    chip.classList.remove('active');
  });
  event.target.classList.add('active');
  
  // Reset to all users first
  filteredUsers = [...mockUsers];
  
  // Apply quick filter
  applyQuickFilter(type);
  
  displayedUsersCount = 12;
  renderUsers();
  updateResultsCount();
  checkEmptyState();
}

function applyQuickFilter(type) {
  switch(type) {
    case 'perfect-match':
      filteredUsers = filteredUsers.filter(user => user.isPerfectMatch);
      break;
    case 'online':
      filteredUsers = filteredUsers.filter(user => user.isOnline);
      break;
    case 'new':
      filteredUsers = filteredUsers.filter(user => user.joinedDays <= 60);
      break;
  }
}

// Clear all filters
function clearFilters() {
  document.getElementById('searchInput').value = '';
  document.getElementById('teachFilter').value = '';
  document.getElementById('learnFilter').value = '';
  document.getElementById('levelFilter').value = '';
  document.getElementById('sortFilter').value = 'match';
  document.getElementById('levelFilter').value = '';
  
  // Reset quick filter
  document.querySelectorAll('.chip').forEach(chip => {
    chip.classList.remove('active');
  });
  document.querySelector('.chip[data-filter="all"]').classList.add('active');
  
  currentFilter = 'all';
  filteredUsers = [...mockUsers];
  displayedUsersCount = 12;
  renderUsers();
  updateResultsCount();
  checkEmptyState();
}

// Render user cards
function renderUsers() {
  const grid = document.getElementById('usersGrid');
  const usersToShow = filteredUsers.slice(0, displayedUsersCount);
  
  grid.innerHTML = usersToShow.map(user => `
    <div class="user-card ${user.isPerfectMatch ? 'perfect-match' : ''}" onclick="viewUserProfile(${user.id})">
      <div class="user-card-header">
        <div class="user-card-avatar">
          ${user.initials}
          ${user.isOnline ? '<span class="online-indicator"></span>' : ''}
        </div>
        <div class="user-card-info">
          <div class="user-card-name">
            ${user.name}
            ${user.isVerified ? '<span class="verified-badge">✓</span>' : ''}
          </div>
          <div class="user-card-title">${user.title}</div>
          <span class="match-percentage">
            ✨ ${user.matchPercentage}% Match
          </span>
        </div>
      </div>
      
      <p class="user-card-bio">${user.bio}</p>
      
      <div class="user-skills-section">
        <div class="skills-label">📚 Teaches</div>
        <div class="skills-tags">
          ${user.teachSkills.slice(0, 3).map(skill => 
            `<span class="skill-badge teach">${skill}</span>`
          ).join('')}
          ${user.teachSkills.length > 3 ? `<span class="skill-badge teach">+${user.teachSkills.length - 3}</span>` : ''}
        </div>
      </div>
      
      <div class="user-skills-section">
        <div class="skills-label">🎯 Wants to Learn</div>
        <div class="skills-tags">
          ${user.learnSkills.slice(0, 3).map(skill => 
            `<span class="skill-badge learn">${skill}</span>`
          ).join('')}
          ${user.learnSkills.length > 3 ? `<span class="skill-badge learn">+${user.learnSkills.length - 3}</span>` : ''}
        </div>
      </div>
      
      <div class="user-card-footer">
        <button class="btn-view-profile" onclick="event.stopPropagation(); viewUserProfile(${user.id})">
          View Profile
        </button>
        <button class="btn-connect" onclick="event.stopPropagation(); openConnectModal(${user.id})">
          Connect
        </button>
      </div>
    </div>
  `).join('');
  
  // Show/hide load more button
  const loadMoreBtn = document.getElementById('loadMoreBtn');
  if (displayedUsersCount >= filteredUsers.length) {
    loadMoreBtn.style.display = 'none';
  } else {
    loadMoreBtn.style.display = 'inline-block';
  }
}

// Load more users
function loadMoreUsers() {
  displayedUsersCount += 12;
  renderUsers();
}

// Update results count
function updateResultsCount() {
  const count = filteredUsers.length;
  const countElement = document.getElementById('resultsCount');
  countElement.textContent = `Showing ${Math.min(displayedUsersCount, count)} of ${count} members`;
}

// Check empty state
function checkEmptyState() {
  const emptyState = document.getElementById('emptyState');
  const usersGrid = document.getElementById('usersGrid');
  
  if (filteredUsers.length === 0) {
    emptyState.style.display = 'block';
    usersGrid.style.display = 'none';
    document.getElementById('loadMoreBtn').style.display = 'none';
  } else {
    emptyState.style.display = 'none';
    usersGrid.style.display = 'grid';
  }
}

// View user profile modal
function viewUserProfile(userId) {
  const user = mockUsers.find(u => u.id === userId);
  if (!user) return;
  
  const modalContent = document.getElementById('profileModalContent');
  modalContent.innerHTML = `
    <div class="profile-modal-header">
      <div class="profile-modal-avatar">
        ${user.initials}
        ${user.isOnline ? '<span class="online-indicator"></span>' : ''}
      </div>
      <div class="profile-modal-info">
        <div class="profile-modal-name">
          ${user.name}
          ${user.isVerified ? '<span class="verified-badge">✓</span>' : ''}
        </div>
        <div class="profile-modal-title">${user.title}</div>
        <div class="profile-stats">
          <div class="profile-stat">
            <span class="profile-stat-value">${user.connections}</span>
            <span class="profile-stat-label">Connections</span>
          </div>
          <div class="profile-stat">
            <span class="profile-stat-value">${user.skillsExchanged}</span>
            <span class="profile-stat-label">Skills Exchanged</span>
          </div>
          <div class="profile-stat">
            <span class="profile-stat-value">${user.rating}/5</span>
            <span class="profile-stat-label">Rating</span>
          </div>
        </div>
      </div>
    </div>
    
    <div class="profile-modal-section">
      <div class="profile-section-title">📖 About</div>
      <p class="profile-modal-bio">${user.bio}</p>
    </div>
    
    <div class="profile-modal-section">
      <div class="profile-section-title">📚 Skills They Teach</div>
      <div class="skills-tags">
        ${user.teachSkills.map(skill => 
          `<span class="skill-badge teach">${skill}</span>`
        ).join('')}
      </div>
    </div>
    
    <div class="profile-modal-section">
      <div class="profile-section-title">🎯 Skills They Want to Learn</div>
      <div class="skills-tags">
        ${user.learnSkills.map(skill => 
          `<span class="skill-badge learn">${skill}</span>`
        ).join('')}
      </div>
    </div>
    
    <div class="profile-modal-section">
      <div class="profile-section-title">🎓 Experience Level</div>
      <span class="skill-badge">${user.level}</span>
    </div>
    
    ${user.isPerfectMatch ? `
      <div class="profile-modal-section">
        <div style="padding: 20px; background: linear-gradient(135deg, rgba(139, 92, 246, 0.25) 0%, rgba(59, 130, 246, 0.25) 100%); border: 2px solid rgba(139, 92, 246, 0.5); border-radius: 16px; text-align: center; box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);">
          <div style="font-size: 2.5rem; margin-bottom: 12px;">✨</div>
          <div style="font-size: 1.2rem; font-weight: 700; color: #ffffff; margin-bottom: 8px; text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);">Perfect Match!</div>
          <div style="font-size: 0.95rem; color: #e5e7eb; line-height: 1.6;">You both want to exchange skills that match each other's interests</div>
        </div>
      </div>
    ` : ''}
    
    <div class="profile-modal-actions">
      <button class="btn-secondary" onclick="closeModal('userProfileModal')">Close</button>
      <button class="btn-primary" onclick="openConnectModal(${user.id})">Send Connection Request</button>
    </div>
  `;
  
  openModal('userProfileModal');
}

// Open connect modal
function openConnectModal(userId) {
  closeModal('userProfileModal');
  const user = mockUsers.find(u => u.id === userId);
  
  // Store userId for form submission
  document.getElementById('connectForm').dataset.userId = userId;
  document.getElementById('connectMessage').value = `Hi ${user.name.split(' ')[0]}! I came across your profile and would love to connect. I'm interested in learning ${user.teachSkills[0]}, and I can teach you ${user.learnSkills[0]}. Looking forward to exchanging skills!`;
  
  openModal('connectModal');
}

// Send connection request
function sendConnectionRequest(event) {
  event.preventDefault();
  const message = document.getElementById('connectMessage').value;
  const userId = event.target.dataset.userId;
  const user = mockUsers.find(u => u.id == userId);
  
  // Create connection request
  const request = {
    id: Date.now(),
    name: user.name,
    initials: user.initials,
    message: message,
    time: 'Just now',
    teaches: user.teachSkills,
    learns: user.learnSkills,
    timestamp: Date.now()
  };
  
  // Get existing requests from localStorage
  let connectionRequests = [];
  const stored = localStorage.getItem('connectionRequests');
  if (stored) {
    connectionRequests = JSON.parse(stored);
  }
  
  // Add new request
  connectionRequests.push(request);
  
  // Save to localStorage
  localStorage.setItem('connectionRequests', JSON.stringify(connectionRequests));
  
  // Close modal
  closeModal('connectModal');
  
  // Show success notification
  showNotification(`Connection request sent to ${user.name}! 🎉`, 'success');
  
  // Reset form
  document.getElementById('connectMessage').value = '';
}

// Modal functions
function openModal(modalId) {
  document.getElementById(modalId).style.display = 'flex';
  setTimeout(() => {
    document.getElementById(modalId).classList.add('active');
  }, 10);
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.classList.remove('active');
  setTimeout(() => {
    modal.style.display = 'none';
  }, 300);
}

// Show notification
function showNotification(message, type = 'success') {
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: ${type === 'success' ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' : 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'};
    color: white;
    padding: 16px 24px;
    border-radius: 12px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
    z-index: 10000;
    font-weight: 600;
    animation: slideIn 0.3s ease;
  `;
  notification.textContent = message;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
  if (event.target.classList.contains('modal-overlay')) {
    event.target.classList.remove('active');
    setTimeout(() => {
      event.target.style.display = 'none';
    }, 300);
  }
});

// Add animation styles
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);
