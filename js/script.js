// Library Management System JavaScript

// Initialize data from localStorage or use default data
function initializeData() {
    // Default admin credentials
    const defaultAdmin = {
        id: 'bca_admin',
        password: 'library2024'
    };

    // Default books
    const defaultBooks = [
        {
            id: 1,
            title: 'Java Programming',
            author: 'James Gosling',
            isbn: '978-0132350884',
            category: 'Programming',
            copies: 5,
            available: 5,
            image: '',
            description: 'Comprehensive guide to Java programming for beginners and advanced users.'
        },
        {
            id: 2,
            title: 'Database Systems',
            author: 'Abraham Silberschatz',
            isbn: '978-0073523323',
            category: 'Database',
            copies: 3,
            available: 3,
            image: '',
            description: 'Complete coverage of database concepts and management systems.'
        },
        {
            id: 3,
            title: 'Computer Networks',
            author: 'Andrew Tanenbaum',
            isbn: '978-0132126953',
            category: 'Networking',
            copies: 4,
            available: 4,
            image: '',
            description: 'Essential guide to computer networking principles and protocols.'
        },
        {
            id: 4,
            title: 'Discrete Mathematics',
            author: 'Kenneth Rosen',
            isbn: '978-0073383095',
            category: 'Mathematics',
            copies: 6,
            available: 6,
            image: '',
            description: 'Fundamental concepts of discrete mathematics for computer science.'
        },
        {
            id: 5,
            title: 'Python Crash Course',
            author: 'Eric Matthes',
            isbn: '978-1593279288',
            category: 'Programming',
            copies: 4,
            available: 4,
            image: '',
            description: 'Hands-on introduction to Python programming.'
        }
    ];

    // Default services
    const defaultServices = [
        {
            id: 1,
            name: 'Book Borrowing',
            description: 'Borrow books for up to 14 days with renewal options',
            icon: 'fas fa-book-reader'
        },
        {
            id: 2,
            name: 'Digital Resources',
            description: 'Access e-books and online research materials',
            icon: 'fas fa-laptop'
        },
        {
            id: 3,
            name: 'Study Rooms',
            description: 'Book quiet study rooms for group work',
            icon: 'fas fa-door-open'
        },
        {
            id: 4,
            name: 'Research Help',
            description: 'Get assistance from librarians for research projects',
            icon: 'fas fa-hands-helping'
        }
    ];

    // Initialize localStorage if empty
    if (!localStorage.getItem('libraryAdmin')) {
        localStorage.setItem('libraryAdmin', JSON.stringify(defaultAdmin));
    }
    if (!localStorage.getItem('libraryBooks')) {
        localStorage.setItem('libraryBooks', JSON.stringify(defaultBooks));
    }
    if (!localStorage.getItem('libraryServices')) {
        localStorage.setItem('libraryServices', JSON.stringify(defaultServices));
    }
    if (!localStorage.getItem('libraryRequests')) {
        localStorage.setItem('libraryRequests', JSON.stringify([]));
    }
}

// Data management functions
function getData(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
}

function setData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

// Admin authentication
function adminLogin(id, password) {
    const admin = JSON.parse(localStorage.getItem('libraryAdmin'));
    return admin && admin.id === id && admin.password === password;
}

function isAdminLoggedIn() {
    return sessionStorage.getItem('adminLoggedIn') === 'true';
}

function setAdminLoggedIn(status) {
    sessionStorage.setItem('adminLoggedIn', status);
}

// Book management functions
function addBook(book) {
    const books = getData('libraryBooks');
    book.id = Date.now();
    book.available = book.copies;
    books.push(book);
    setData('libraryBooks', books);
    return book;
}

function updateBook(id, updates) {
    const books = getData('libraryBooks');
    const index = books.findIndex(b => b.id === id);
    if (index !== -1) {
        books[index] = { ...books[index], ...updates };
        setData('libraryBooks', books);
        return books[index];
    }
    return null;
}

function deleteBook(id) {
    const books = getData('libraryBooks');
    const filtered = books.filter(b => b.id !== id);
    setData('libraryBooks', filtered);
}

function getBooks() {
    return getData('libraryBooks');
}

// Request management functions
function addRequest(request) {
    const requests = getData('libraryRequests');
    request.id = Date.now();
    request.status = 'pending';
    request.date = new Date().toISOString();
    requests.push(request);
    setData('libraryRequests', requests);
    return request;
}

function updateRequestStatus(id, status) {
    const requests = getData('libraryRequests');
    const index = requests.findIndex(r => r.id === id);
    if (index !== -1) {
        requests[index].status = status;
        setData('libraryRequests', requests);
        
        // Update book availability if approved
        if (status === 'approved') {
            const book = getBookById(requests[index].bookId);
            if (book && book.available > 0) {
                updateBook(book.id, { available: book.available - 1 });
            }
        }
        return requests[index];
    }
    return null;
}

function getRequests() {
    return getData('libraryRequests');
}

function getBookById(id) {
    const books = getBooks();
    return books.find(b => b.id === id);
}

// Service management functions
function addService(service) {
    const services = getData('libraryServices');
    service.id = Date.now();
    services.push(service);
    setData('libraryServices', services);
    return service;
}

function deleteService(id) {
    const services = getData('libraryServices');
    const filtered = services.filter(s => s.id !== id);
    setData('libraryServices', filtered);
}

function getServices() {
    return getData('libraryServices');
}

// UI Functions
function updateStats() {
    const books = getBooks();
    const requests = getRequests();
    const pendingRequests = requests.filter(r => r.status === 'pending');
    
    document.getElementById('totalBooks').textContent = books.length;
    document.getElementById('totalUsers').textContent = Math.floor(Math.random() * 50) + 20;
    document.getElementById('totalRequests').textContent = pendingRequests.length;
}

function renderBooks(containerId, books, showActions = true) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    if (books.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-book"></i>
                <p>No books found</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = books.map(book => `
        <div class="book-card">
            <div class="book-image">
                ${book.image ? `<img src="${book.image}" alt="${book.title}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                <i class="fas fa-book" style="display: none;"></i>` : '<i class="fas fa-book"></i>'}
            </div>
            <div class="book-info">
                <h4 class="book-title">${book.title}</h4>
                <p class="book-author">by ${book.author}</p>
                <span class="book-category">${book.category}</span>
                <p class="book-copies">
                    <i class="fas fa-copy"></i> ${book.available}/${book.copies} available
                </p>
                ${book.description ? `<p style="font-size: 0.85rem; color: #64748b; margin-bottom: 1rem;">${book.description.substring(0, 100)}...</p>` : ''}
                ${showActions ? `
                <div class="book-actions">
                    <button class="btn btn-primary btn-sm" onclick="requestBook(${book.id})">
                        <i class="fas fa-paper-plane"></i> Request
                    </button>
                </div>
                ` : ''}
            </div>
        </div>
    `).join('');
}

function renderAdminBooks() {
    const books = getBooks();
    const container = document.getElementById('booksGrid');
    if (!container) return;
    
    if (books.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-book"></i>
                <p>No books added yet</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = books.map(book => `
        <div class="book-card">
            <div class="book-image">
                ${book.image ? `<img src="${book.image}" alt="${book.title}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                <i class="fas fa-book" style="display: none;"></i>` : '<i class="fas fa-book"></i>'}
            </div>
            <div class="book-info">
                <h4 class="book-title">${book.title}</h4>
                <p class="book-author">by ${book.author}</p>
                <span class="book-category">${book.category}</span>
                <p class="book-copies">
                    <i class="fas fa-copy"></i> ${book.available}/${book.copies} available
                </p>
                <p style="font-size: 0.85rem; color: #64748b;">ISBN: ${book.isbn}</p>
                <div class="book-actions">
                    <button class="btn btn-secondary btn-sm" onclick="editBook(${book.id})">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="btn btn-danger btn-sm" onclick="deleteBookHandler(${book.id})">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function renderRequests() {
    const requests = getRequests();
    const container = document.getElementById('requestsList');
    if (!container) return;
    
    if (requests.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-envelope"></i>
                <p>No book requests yet</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = requests.map(request => {
        const book = getBookById(request.bookId);
        return `
        <div class="request-card ${request.status}">
            <div class="request-header">
                <span class="request-book">${book ? book.title : 'Unknown Book'}</span>
                <span class="request-status ${request.status}">${request.status.toUpperCase()}</span>
            </div>
            <div class="request-details">
                <p><strong>Requested by:</strong> ${request.name} (${request.studentId})</p>
                <p><strong>Email:</strong> ${request.email}</p>
                <p><strong>Date:</strong> ${new Date(request.date).toLocaleDateString()}</p>
                ${request.message ? `<p><strong>Message:</strong> ${request.message}</p>` : ''}
            </div>
            ${request.status === 'pending' ? `
            <div class="request-actions">
                <button class="btn btn-secondary btn-sm" onclick="approveRequest(${request.id})">
                    <i class="fas fa-check"></i> Approve
                </button>
                <button class="btn btn-danger btn-sm" onclick="rejectRequest(${request.id})">
                    <i class="fas fa-times"></i> Reject
                </button>
            </div>
            ` : ''}
        </div>
    `}).join('');
}

function renderServices() {
    const services = getServices();
    const container = document.getElementById('servicesGrid');
    if (!container) return;
    
    if (services.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-cog"></i>
                <p>No services added yet</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = services.map(service => `
        <div class="service-card">
            <i class="${service.icon}"></i>
            <h4>${service.name}</h4>
            <p>${service.description}</p>
            <div class="service-actions">
                <button class="btn btn-danger btn-sm" onclick="deleteServiceHandler(${service.id})">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </div>
        </div>
    `).join('');
}

function renderUserRequests() {
    const requests = getRequests();
    const container = document.getElementById('myRequestsList');
    if (!container) return;
    
    if (requests.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-envelope"></i>
                <p>No requests yet</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = requests.map(request => {
        const book = getBookById(request.bookId);
        return `
        <div class="request-card ${request.status}">
            <div class="request-header">
                <span class="request-book">${book ? book.title : 'Unknown Book'}</span>
                <span class="request-status ${request.status}">${request.status.toUpperCase()}</span>
            </div>
            <div class="request-details">
                <p><strong>Date:</strong> ${new Date(request.date).toLocaleDateString()}</p>
                <p><strong>Status:</strong> ${request.status}</p>
            </div>
        </div>
    `}).join('');
}

// Event Handlers
function handleLogin(e) {
    e.preventDefault();
    const id = document.getElementById('adminId').value;
    const password = document.getElementById('adminPassword').value;
    
    if (adminLogin(id, password)) {
        setAdminLoggedIn('true');
        document.getElementById('loginSection').style.display = 'none';
        document.getElementById('adminDashboard').style.display = 'block';
        renderAdminBooks();
        renderRequests();
        renderServices();
    } else {
        alert('Invalid credentials! Please try again.');
    }
}

function handleLogout() {
    setAdminLoggedIn('false');
    document.getElementById('loginSection').style.display = 'flex';
    document.getElementById('adminDashboard').style.display = 'none';
    document.getElementById('loginForm').reset();
}

function handleAddBook(e) {
    e.preventDefault();
    
    const book = {
        title: document.getElementById('bookTitle').value,
        author: document.getElementById('bookAuthor').value,
        isbn: document.getElementById('bookISBN').value,
        category: document.getElementById('bookCategory').value,
        copies: parseInt(document.getElementById('bookCopies').value),
        image: document.getElementById('bookImage').value,
        description: document.getElementById('bookDescription').value
    };
    
    addBook(book);
    document.getElementById('addBookForm').reset();
    document.getElementById('bookForm').style.display = 'none';
    renderAdminBooks();
    alert('Book added successfully!');
}

function handleAddService(e) {
    e.preventDefault();
    
    const service = {
        name: document.getElementById('serviceName').value,
        description: document.getElementById('serviceDescription').value,
        icon: document.getElementById('serviceIcon').value
    };
    
    addService(service);
    document.getElementById('addServiceForm').reset();
    document.getElementById('serviceForm').style.display = 'none';
    renderServices();
    alert('Service added successfully!');
}

function deleteBookHandler(id) {
    if (confirm('Are you sure you want to delete this book?')) {
        deleteBook(id);
        renderAdminBooks();
        alert('Book deleted successfully!');
    }
}

function deleteServiceHandler(id) {
    if (confirm('Are you sure you want to delete this service?')) {
        deleteService(id);
        renderServices();
        alert('Service deleted successfully!');
    }
}

function approveRequest(id) {
    updateRequestStatus(id, 'approved');
    renderRequests();
    alert('Request approved!');
}

function rejectRequest(id) {
    updateRequestStatus(id, 'rejected');
    renderRequests();
    alert('Request rejected!');
}

let currentBookId = null;

function requestBook(bookId) {
    currentBookId = bookId;
    const book = getBookById(bookId);
    if (!book) return;
    
    const modal = document.getElementById('requestModal');
    const details = document.getElementById('modalBookDetails');
    
    details.innerHTML = `
        <p><strong>Book:</strong> ${book.title}</p>
        <p><strong>Author:</strong> ${book.author}</p>
        <p><strong>Category:</strong> ${book.category}</p>
        <p><strong>Available:</strong> ${book.available}/${book.copies}</p>
    `;
    
    modal.classList.add('active');
}

function handleRequestForm(e) {
    e.preventDefault();
    
    const request = {
        bookId: currentBookId,
        name: document.getElementById('requesterName').value,
        studentId: document.getElementById('requesterId').value,
        email: document.getElementById('requesterEmail').value,
        message: document.getElementById('requestMessage').value
    };
    
    addRequest(request);
    document.getElementById('requestForm').reset();
    document.getElementById('requestModal').classList.remove('active');
    renderUserRequests();
    alert('Book request sent successfully!');
}

// Tab switching
function switchTab(tabName) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    document.getElementById(`${tabName}Tab`).classList.add('active');
}

// Search and filter
function filterBooks() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const category = document.getElementById('categoryFilter').value;
    
    let books = getBooks();
    
    if (searchTerm) {
        books = books.filter(book => 
            book.title.toLowerCase().includes(searchTerm) ||
            book.author.toLowerCase().includes(searchTerm) ||
            book.isbn.toLowerCase().includes(searchTerm)
        );
    }
    
    if (category) {
        books = books.filter(book => book.category === category);
    }
    
    renderBooks('userBooksGrid', books);
    document.getElementById('bookCount').textContent = `${books.length} books`;
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeData();
    updateStats();
    
    // Check if on admin page
    if (window.location.pathname.includes('admin.html')) {
        if (isAdminLoggedIn()) {
            document.getElementById('loginSection').style.display = 'none';
            document.getElementById('adminDashboard').style.display = 'block';
            renderAdminBooks();
            renderRequests();
            renderServices();
        }
        
        // Admin event listeners
        document.getElementById('loginForm').addEventListener('submit', handleLogin);
        document.getElementById('logoutBtn').addEventListener('click', handleLogout);
        document.getElementById('addBookBtn').addEventListener('click', () => {
            document.getElementById('bookForm').style.display = 'block';
        });
        document.getElementById('cancelBookBtn').addEventListener('click', () => {
            document.getElementById('bookForm').style.display = 'none';
            document.getElementById('addBookForm').reset();
        });
        document.getElementById('addBookForm').addEventListener('submit', handleAddBook);
        document.getElementById('addServiceBtn').addEventListener('click', () => {
            document.getElementById('serviceForm').style.display = 'block';
        });
        document.getElementById('cancelServiceBtn').addEventListener('click', () => {
            document.getElementById('serviceForm').style.display = 'none';
            document.getElementById('addServiceForm').reset();
        });
        document.getElementById('addServiceForm').addEventListener('submit', handleAddService);
        
        // Tab switching
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', () => switchTab(btn.dataset.tab));
        });
    }
    
    // Check if on user page
    if (window.location.pathname.includes('user.html')) {
        renderBooks('userBooksGrid', getBooks());
        renderUserRequests();
        document.getElementById('bookCount').textContent = `${getBooks().length} books`;
        
        // Search and filter
        document.getElementById('searchInput').addEventListener('input', filterBooks);
        document.getElementById('categoryFilter').addEventListener('change', filterBooks);
        
        // Modal
        document.getElementById('closeModal').addEventListener('click', () => {
            document.getElementById('requestModal').classList.remove('active');
        });
        document.getElementById('requestForm').addEventListener('submit', handleRequestForm);
        
        // Close modal on outside click
        document.getElementById('requestModal').addEventListener('click', (e) => {
            if (e.target.id === 'requestModal') {
                document.getElementById('requestModal').classList.remove('active');
            }
        });
    }
});
