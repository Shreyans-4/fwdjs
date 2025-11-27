# SkillSwap - Peer-to-Peer Learning Platform

A modern web application that connects people who want to learn new skills with those who can teach them. Built with vanilla HTML, CSS, and JavaScript.

## 🚀 Features

- **User Authentication** - Sign up and login functionality with form validation
- **Profile Management** - Create and customize your learning profile
- **Skill Matching** - Select skills you want to teach and learn
- **Email Notifications** - Toggle notifications for matches and updates
- **Responsive Design** - Works seamlessly on desktop and mobile devices
- **Accessible** - WCAG 2.1 compliant with ARIA labels and keyboard navigation

## 📁 Project Structure

```
FWD js/
├── index.html          # Home page with hero section and features
├── profile.html        # User profile page
├── styles.css          # Global styles and component styling
├── script.js           # Application logic and interactions
└── README.md          # This file
```

## 🛠️ Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with CSS Grid and Flexbox
- **JavaScript (ES6+)** - Vanilla JS with no frameworks
- **LocalStorage** - Client-side data persistence
- **Font Awesome** - Icons (via CDN)
- **Google Fonts** - Inter font family

## 🎨 Design Features

- Gradient color scheme (Purple to Blue)
- Glassmorphism effects
- Smooth animations and transitions
- Modal dialogs for authentication
- Toast notifications
- Custom toggle switches
- Responsive navigation

## 📋 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local development server (optional, but recommended)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/YOUR_USERNAME/skillswap.git
cd skillswap
```

2. Open with a local server:

**Using Python:**
```bash
python -m http.server 8000
```

**Using Node.js (http-server):**
```bash
npx http-server -p 8000
```

**Using VS Code Live Server:**
- Install the "Live Server" extension
- Right-click on `index.html`
- Select "Open with Live Server"

3. Open your browser and navigate to:
```
http://localhost:8000
```

## 🎯 Usage

### Creating an Account

1. Click "Get Started" or "Sign Up" button
2. Fill in your full name, email, and password
3. Set your learning preferences (skills to teach/learn)
4. Complete your profile setup

### Managing Your Profile

1. Login with your credentials
2. Navigate to your profile page
3. View your skills and preferences
4. Toggle email notifications
5. Edit or delete your account

## ✅ Recent Improvements

### Security
- ✅ Input validation for email and passwords
- ✅ Password strength checking
- ✅ Security headers (X-Frame-Options, XSS Protection)
- ✅ Basic password encoding (demo - use bcrypt in production)

### Accessibility
- ✅ ARIA labels for all interactive elements
- ✅ Keyboard navigation support
- ✅ Focus indicators for all controls
- ✅ Semantic HTML structure
- ✅ Screen reader compatibility

### User Experience
- ✅ Real-time form validation
- ✅ Inline error messages
- ✅ Toast notifications
- ✅ Smooth animations
- ✅ Loading states

### Code Quality
- ✅ Error handling with try-catch blocks
- ✅ Input sanitization
- ✅ Reusable validation functions
- ✅ Comprehensive code comments
- ✅ Modular function organization

## 🔧 Development

### Code Structure

**JavaScript Functions:**
- `validateEmail()` - Email format validation
- `validatePassword()` - Password strength checking
- `handleLogin()` - User authentication
- `handleSignup()` - Account creation
- `loadProfileData()` - Profile data loading
- `toggleNotifications()` - Notification preferences
- `showToast()` - Toast message display

### LocalStorage Keys

- `userData` - User profile information
- `isLoggedIn` - Login state
- `emailNotifications` - Notification preferences

## 🐛 Known Issues

None currently! All critical and high-priority issues have been resolved.

## 📝 Future Enhancements

- [ ] Backend API integration
- [ ] Real database (MongoDB/PostgreSQL)
- [ ] Actual password hashing (bcrypt)
- [ ] User matching algorithm
- [ ] Messaging system
- [ ] Video chat integration
- [ ] Rating and review system
- [ ] Advanced search and filters
- [ ] Email verification
- [ ] Password reset functionality

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

Your Name - [@yourusername](https://github.com/yourusername)

## 🙏 Acknowledgments

- Font Awesome for icons
- Google Fonts for typography
- Inspiration from modern peer-learning platforms

## 📞 Support

For support, email your-email@example.com or open an issue in the repository.

---

**Made with ❤️ for learners and teachers everywhere**
