# 📚 Library Management System - BCA

A modern, attractive library management system built with HTML, CSS, and JavaScript. Perfect for BCA (Bachelor of Computer Applications) projects and can be easily deployed on GitHub Pages.

## ✨ Features

### Admin Features
- 🔐 Secure admin login (Default: admin / admin123)
- 📚 Add, edit, and delete books
- 📸 Add book images and descriptions
- 📋 Manage book categories (Programming, Database, Networking, Mathematics, Other)
- ✉️ View and manage book requests (Approve/Reject)
- ⚙️ Add and manage library services
- 📊 Dashboard with statistics

### User Features
- 🔍 Search books by title, author, or ISBN
- 📂 Filter books by category
- 👀 Browse available books with images
- 📝 Send book requests
- 📬 Track request status
- 🎨 Attractive and responsive design

### Design Features
- 🎨 Modern gradient design
- 📱 Fully responsive (mobile-friendly)
- 🖼️ Book image support
- 🔤 Font Awesome icons throughout
- ✨ Smooth animations and transitions
- 🌈 Beautiful color scheme

## 🚀 Quick Start

### Local Development
1. Clone or download this repository
2. Open `index.html` in your web browser
3. That's it! No server required.

### Default Admin Credentials
- **Admin ID:** admin
- **Password:** admin123

## 📦 Project Structure

```
library-management-system/
├── index.html          # Main landing page
├── admin.html          # Admin portal
├── user.html           # User portal
├── css/
│   └── style.css       # All styling
├── js/
│   └── script.js       # JavaScript functionality
└── README.md           # This file
```

## 🌐 Deploy to GitHub Pages

### Method 1: Using GitHub Web Interface

1. **Create a new GitHub repository**
   - Go to [github.com](https://github.com) and sign in
   - Click the "+" icon → "New repository"
   - Name it (e.g., `library-management-system`)
   - Make it Public (for free GitHub Pages)
   - Click "Create repository"

2. **Upload your files**
   - Click "uploading an existing file"
   - Drag and drop all project files:
     - index.html
     - admin.html
     - user.html
     - css/ folder (with style.css)
     - js/ folder (with script.js)
   - Click "Commit changes"

3. **Enable GitHub Pages**
   - Go to repository Settings
   - Click "Pages" in the left sidebar
   - Under "Build and deployment", select "Deploy from a branch"
   - Select "main" branch and "/ (root)" folder
   - Click "Save"

4. **Access your site**
   - Wait 1-2 minutes for deployment
   - Your site will be available at: `https://yourusername.github.io/library-management-system/`

### Method 2: Using Git Command Line

```bash
# Initialize git repository
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial commit - Library Management System"

# Rename branch to main (if needed)
git branch -M main

# Add remote repository
git remote add origin https://github.com/yourusername/library-management-system.git

# Push to GitHub
git push -u origin main
```

Then follow steps 3-4 from Method 1 to enable GitHub Pages.

## 🎯 How to Use

### For Admin
1. Go to the Admin Portal
2. Login with admin credentials
3. Use the dashboard to:
   - Add new books with images
   - Manage existing books
   - Approve/reject book requests
   - Add library services

### For Users
1. Go to the User Portal
2. Browse available books
3. Use search and filter to find books
4. Click "Request" on any book
5. Fill in your details and submit
6. Track your request status

## 🛠️ Customization

### Change Admin Credentials
Edit the `defaultAdmin` object in `js/script.js`:

```javascript
const defaultAdmin = {
    id: 'your-admin-id',
    password: 'your-password'
};
```

### Add Default Books
Edit the `defaultBooks` array in `js/script.js` to add more initial books.

### Change Colors
Edit CSS variables in `css/style.css`:

```css
:root {
    --primary-color: #2563eb;
    --secondary-color: #10b981;
    --danger-color: #ef4444;
    /* ... more colors */
}
```

### Add Book Images
When adding books, you can:
- Use direct image URLs (e.g., from Unsplash, book covers)
- Leave blank for default gradient background

## 📱 Browser Compatibility

- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers

## 💾 Data Storage

This system uses **localStorage** for data persistence:
- Books, requests, and services are stored in the browser
- Data persists between sessions
- Clear browser data to reset

## 🎓 Perfect For

- BCA projects
- College library management
- Educational demonstrations
- Web development portfolios
- Learning HTML/CSS/JavaScript

## 📝 Notes

- This is a client-side application (no backend required)
- Data is stored locally in the browser
- For production use, consider adding a backend database
- Admin credentials are stored in localStorage (change for security)

## 🤝 Contributing

Feel free to fork, modify, and use this project for your needs!

## 📄 License

Free to use for educational purposes.

---

**Built with ❤️ using HTML, CSS, and JavaScript**

**Deploy easily on GitHub Pages - No server required!**
