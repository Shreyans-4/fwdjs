// ================================================
// PROFILE PAGE JAVASCRIPT
// ================================================

// Mock data for connection requests and connections
let connectionRequests = [];
let myConnections = [];
let currentChatUser = null;
let chatMessages = [];

// Initialize profile page
document.addEventListener('DOMContentLoaded', function() {
  loadConnectionRequests();
  loadMyConnections();
  
  // Restore active chat if it exists
  restoreActiveChat();
  
  // Check if there's a pending chat from localStorage
  const pendingChat = localStorage.getItem('pendingChat');
  if (pendingChat) {
    const userData = JSON.parse(pendingChat);
    openChatWithUser(userData);
    localStorage.removeItem('pendingChat');
  }
});

// Load connection requests from localStorage
function loadConnectionRequests() {
  const stored = localStorage.getItem('connectionRequests');
  if (stored) {
    connectionRequests = JSON.parse(stored);
  }
  renderConnectionRequests();
}

// Load connections from localStorage
function loadMyConnections() {
  const stored = localStorage.getItem('myConnections');
  if (stored) {
    myConnections = JSON.parse(stored);
  }
  renderMyConnections();
}

// Save connection requests to localStorage
function saveConnectionRequests() {
  localStorage.setItem('connectionRequests', JSON.stringify(connectionRequests));
}

// Save connections to localStorage
function saveMyConnections() {
  localStorage.setItem('myConnections', JSON.stringify(myConnections));
}

// Restore active chat from localStorage
function restoreActiveChat() {
  const activeChatUser = localStorage.getItem('activeChatUser');
  const isMinimized = localStorage.getItem('chatMinimized') === 'true';
  
  if (activeChatUser) {
    const user = JSON.parse(activeChatUser);
    currentChatUser = user;
    
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
    
    // Load messages
    loadChatMessages(user.id);
    
    // Show chat in correct state
    const chatWindow = document.getElementById('chatWindow');
    const chatMinimized = document.getElementById('chatMinimized');
    
    if (isMinimized) {
      if (chatWindow) chatWindow.classList.remove('active');
      if (chatMinimized) chatMinimized.style.display = 'flex';
    } else {
      if (chatWindow) chatWindow.classList.add('active');
      if (chatMinimized) chatMinimized.style.display = 'none';
    }
  }
}

// Render connection requests
function renderConnectionRequests() {
  const container = document.getElementById('connectionRequestsList');
  const countBadge = document.getElementById('requestsCount');
  
  if (connectionRequests.length === 0) {
    container.innerHTML = `
      <p style="color: var(--muted-foreground); text-align: center; padding: 2rem;">
        No pending requests
      </p>
    `;
    countBadge.textContent = '0';
    return;
  }
  
  countBadge.textContent = connectionRequests.length;
  
  container.innerHTML = connectionRequests.map(request => `
    <div class="request-card">
      <div class="request-header">
        <div class="request-avatar">${request.initials}</div>
        <div class="request-info">
          <div class="request-name">${request.name}</div>
          <div class="request-time">${request.time}</div>
        </div>
      </div>
      <div class="request-message">${request.message}</div>
      <div class="request-actions">
        <button class="btn-accept" onclick="acceptRequest(${request.id})">
          Accept
        </button>
        <button class="btn-decline" onclick="declineRequest(${request.id})">
          Decline
        </button>
      </div>
    </div>
  `).join('');
}

// Render my connections
function renderMyConnections() {
  const container = document.getElementById('myConnectionsList');
  const countBadge = document.getElementById('connectionsCount');
  
  if (myConnections.length === 0) {
    container.innerHTML = `
      <p style="color: var(--muted-foreground); text-align: center; padding: 2rem;">
        No connections yet
      </p>
    `;
    countBadge.textContent = '0';
    return;
  }
  
  countBadge.textContent = myConnections.length;
  
  container.innerHTML = myConnections.map(connection => `
    <div class="connection-card" onclick="openChatWithConnection(${connection.id})">
      <div class="connection-avatar">
        ${connection.initials}
        ${connection.isOnline ? '<span class="online-dot"></span>' : ''}
      </div>
      <div class="connection-info">
        <div class="connection-name">${connection.name}</div>
        <div class="connection-skills">Teaches: ${connection.teaches.join(', ')}</div>
      </div>
      <button class="btn-message" onclick="event.stopPropagation(); openChatWithConnection(${connection.id})">
        Message
      </button>
    </div>
  `).join('');
}

// Accept connection request
function acceptRequest(requestId) {
  const requestIndex = connectionRequests.findIndex(r => r.id === requestId);
  if (requestIndex === -1) return;
  
  const request = connectionRequests[requestIndex];
  
  // Remove from requests
  connectionRequests.splice(requestIndex, 1);
  saveConnectionRequests();
  
  // Add to connections
  const newConnection = {
    id: request.id,
    name: request.name,
    initials: request.initials,
    teaches: request.teaches || ['Web Development'],
    learns: request.learns || ['Photography'],
    isOnline: Math.random() > 0.5,
    connectedAt: new Date().toISOString()
  };
  
  myConnections.unshift(newConnection);
  saveMyConnections();
  
  // Refresh displays
  renderConnectionRequests();
  renderMyConnections();
  
  // Show success message and open chat
  showNotification(`You're now connected with ${request.name}! 🎉`, 'success');
  
  // Open chat window after a short delay
  setTimeout(() => {
    openChatWithConnection(request.id);
  }, 1000);
}

// Decline connection request
function declineRequest(requestId) {
  const requestIndex = connectionRequests.findIndex(r => r.id === requestId);
  if (requestIndex === -1) return;
  
  const request = connectionRequests[requestIndex];
  connectionRequests.splice(requestIndex, 1);
  saveConnectionRequests();
  
  renderConnectionRequests();
  showNotification(`Request from ${request.name} declined`, 'info');
}

// Open chat with a connection
function openChatWithConnection(connectionId) {
  const connection = myConnections.find(c => c.id === connectionId);
  if (!connection) return;
  
  openChatWithUser({
    id: connection.id,
    name: connection.name,
    initials: connection.initials,
    isOnline: connection.isOnline
  });
}

// Open chat with user
function openChatWithUser(user) {
  currentChatUser = user;
  
  // Update chat header
  document.getElementById('chatAvatar').textContent = user.initials;
  document.getElementById('chatUserName').textContent = user.name;
  document.getElementById('chatUserStatus').textContent = user.isOnline ? 'Online' : 'Offline';
  document.getElementById('chatUserStatus').style.color = user.isOnline ? '#10b981' : '#9ca3af';
  
  // Update minimized chat info
  document.getElementById('chatMiniAvatar').textContent = user.initials;
  document.getElementById('chatMiniName').textContent = user.name;
  
  // Load chat messages for this user
  loadChatMessages(user.id);
  
  // Show chat window
  const chatWindow = document.getElementById('chatWindow');
  chatWindow.classList.add('active');
  
  // Hide minimized button
  document.getElementById('chatMinimized').style.display = 'none';
  
  // Save active chat to localStorage so it persists across pages
  localStorage.setItem('activeChatUser', JSON.stringify(user));
  localStorage.setItem('chatMinimized', 'false');
  
  // Focus on input
  setTimeout(() => {
    document.getElementById('chatInput').focus();
  }, 100);
}

// Load chat messages
function loadChatMessages(userId) {
  const messagesContainer = document.getElementById('chatMessages');
  
  // Get messages from localStorage
  const storedMessages = localStorage.getItem(`chat_${userId}`);
  if (storedMessages) {
    chatMessages = JSON.parse(storedMessages);
  } else {
    // Welcome message for new chat
    chatMessages = [
      {
        id: 1,
        sender: 'them',
        text: `Hi! Thanks for connecting! I'm excited to start exchanging skills with you. 😊`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        timestamp: new Date().getTime()
      }
    ];
  }
  
  renderChatMessages();
}

// Render chat messages
function renderChatMessages() {
  const messagesContainer = document.getElementById('chatMessages');
  const dateDiv = messagesContainer.querySelector('.chat-date-divider');
  
  messagesContainer.innerHTML = '';
  messagesContainer.appendChild(dateDiv);
  
  chatMessages.forEach(msg => {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${msg.sender === 'me' ? 'sent' : ''}`;
    
    messageDiv.innerHTML = `
      <div class="message-avatar">${msg.sender === 'me' ? 'ME' : currentChatUser.initials}</div>
      <div class="message-content">
        <div class="message-bubble">${msg.text}</div>
        <div class="message-time">${msg.time}</div>
      </div>
    `;
    
    messagesContainer.appendChild(messageDiv);
  });
  
  // Scroll to bottom
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Send message
function sendMessage() {
  const input = document.getElementById('chatInput');
  const text = input.value.trim();
  
  if (!text || !currentChatUser) return;
  
  const newMessage = {
    id: chatMessages.length + 1,
    sender: 'me',
    text: text,
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    timestamp: new Date().getTime()
  };
  
  chatMessages.push(newMessage);
  
  // Save to localStorage
  localStorage.setItem(`chat_${currentChatUser.id}`, JSON.stringify(chatMessages));
  
  // Clear input
  input.value = '';
  input.style.height = 'auto';
  
  // Render messages
  renderChatMessages();
  
  // Simulate response after a delay
  setTimeout(() => {
    simulateResponse();
  }, 2000 + Math.random() * 2000);
}

// Simulate response from other user
function simulateResponse() {
  const responses = [
    "That sounds great! When would you like to start?",
    "I'm available this week. What works for you?",
    "Thanks for reaching out! I'd love to help you learn.",
    "That's perfect! I'm also interested in what you can teach.",
    "Looking forward to our skill exchange! 😊",
    "Absolutely! Let's schedule a session soon.",
    "Great! I think we'll learn a lot from each other.",
    "Yes, I'm excited to get started!",
    "Perfect timing! I've been wanting to improve in that area.",
    "Sounds like a plan! Let's make it happen."
  ];
  
  const response = responses[Math.floor(Math.random() * responses.length)];
  
  const newMessage = {
    id: chatMessages.length + 1,
    sender: 'them',
    text: response,
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    timestamp: new Date().getTime()
  };
  
  chatMessages.push(newMessage);
  localStorage.setItem(`chat_${currentChatUser.id}`, JSON.stringify(chatMessages));
  
  renderChatMessages();
  
  // Show notification if chat is minimized
  if (!document.getElementById('chatWindow').classList.contains('active')) {
    const badge = document.getElementById('chatMiniBadge');
    const currentCount = parseInt(badge.textContent) || 0;
    badge.textContent = currentCount + 1;
    badge.style.display = 'flex';
    
    document.getElementById('chatMiniPreview').textContent = response.substring(0, 30) + '...';
  }
}

// Handle Enter key in chat input
function handleChatKeyPress(event) {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault();
    sendMessage();
  }
}

// Auto-resize textarea
document.addEventListener('DOMContentLoaded', function() {
  const chatInput = document.getElementById('chatInput');
  if (chatInput) {
    chatInput.addEventListener('input', function() {
      this.style.height = 'auto';
      this.style.height = Math.min(this.scrollHeight, 100) + 'px';
    });
  }
});

// Minimize chat
function minimizeChat() {
  document.getElementById('chatWindow').classList.remove('active');
  document.getElementById('chatMinimized').style.display = 'flex';
  
  // Save minimized state
  localStorage.setItem('chatMinimized', 'true');
}

// Restore chat
function restoreChat() {
  document.getElementById('chatMinimized').style.display = 'none';
  document.getElementById('chatWindow').classList.add('active');
  
  // Reset unread badge
  const badge = document.getElementById('chatMiniBadge');
  badge.textContent = '0';
  badge.style.display = 'none';
  
  // Focus input
  const chatInput = document.getElementById('chatInput');
  if (chatInput) chatInput.focus();
  
  // Update state
  localStorage.setItem('chatMinimized', 'false');
}

// Close chat
function closeChat() {
  document.getElementById('chatWindow').classList.remove('active');
  document.getElementById('chatMinimized').style.display = 'none';
  currentChatUser = null;
  chatMessages = [];
  
  // Remove from localStorage so it doesn't persist
  localStorage.removeItem('activeChatUser');
  localStorage.removeItem('activeChatMessages');
  localStorage.removeItem('chatMinimized');
}

// Show notification
function showNotification(message, type = 'success') {
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: ${type === 'success' ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' : type === 'info' ? 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)' : 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'};
    color: white;
    padding: 16px 24px;
    border-radius: 12px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
    z-index: 10000;
    font-weight: 600;
    animation: slideIn 0.3s ease;
    max-width: 350px;
  `;
  notification.textContent = message;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => notification.remove(), 300);
  }, 4000);
}

// Add some sample connection requests when page loads (for demo)
if (localStorage.getItem('demoRequestsAdded') !== 'true') {
  const sampleRequests = [
    {
      id: 101,
      name: "Sarah Martinez",
      initials: "SM",
      message: "Hi abc! I came across your profile and would love to connect. I'm interested in learning Web Development, and I can teach you Photography. Looking forward to exchanging skills!",
      time: "1 hour ago",
      teaches: ["Photography", "Photo Editing", "Lightroom"],
      learns: ["Web Development", "Marketing"],
      timestamp: Date.now() - 3600000
    },
    {
      id: 102,
      name: "Alex Johnson",
      initials: "AJ",
      message: "Hey abc! I see you're interested in Graphic Design. I'd be happy to teach you, and in exchange, I'd love to learn JavaScript from you. Let's connect!",
      time: "3 hours ago",
      teaches: ["Graphic Design", "UI/UX", "Figma"],
      learns: ["Web Development", "React"],
      timestamp: Date.now() - 10800000
    },
    {
      id: 103,
      name: "Michael Chen",
      initials: "MC",
      message: "Hello abc! Your profile really stood out to me. I'm a marketing specialist and would love to help you with digital marketing strategies. In return, I'd love to learn web development from you!",
      time: "5 hours ago",
      teaches: ["Marketing", "SEO", "Social Media"],
      learns: ["Web Development", "Data Science"],
      timestamp: Date.now() - 18000000
    },
    {
      id: 104,
      name: "Emma Wilson",
      initials: "EW",
      message: "Hi there abc! I'm a professional writer and I noticed we have complementary skills. I can help you with content writing and copywriting, and I'd love to learn web design from you. Excited to connect!",
      time: "8 hours ago",
      teaches: ["Writing", "Copywriting", "Content Strategy"],
      learns: ["Web Development", "Graphic Design"],
      timestamp: Date.now() - 28800000
    },
    {
      id: 105,
      name: "David Kim",
      initials: "DK",
      message: "Hey abc! I'm a music producer and composer. I saw your profile and think we could have a great skill exchange. I can teach you music production, and I'm interested in learning web development to build my portfolio site!",
      time: "12 hours ago",
      teaches: ["Music Production", "Audio Engineering", "Ableton"],
      learns: ["Web Development", "Video Editing"],
      timestamp: Date.now() - 43200000
    },
    {
      id: 106,
      name: "Nina Kowalski",
      initials: "NK",
      message: "Hi abc! I'm a UI/UX designer and I'd love to exchange skills with you. I can help you learn design systems and Figma, and I'm really interested in learning frontend development. Looking forward to working together!",
      time: "1 day ago",
      teaches: ["UI/UX Design", "Figma", "Design Systems"],
      learns: ["Web Development", "React", "Frontend"],
      timestamp: Date.now() - 86400000
    }
  ];
  
  localStorage.setItem('connectionRequests', JSON.stringify(sampleRequests));
  localStorage.setItem('demoRequestsAdded', 'true');
  
  // Reload requests
  setTimeout(() => {
    loadConnectionRequests();
  }, 100);
}
