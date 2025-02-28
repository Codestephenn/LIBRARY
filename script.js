const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    displayBooks();
}

function displayBooks(filter = 'all') {
    const libraryDiv = document.querySelector('#library');
    libraryDiv.innerHTML = '';

    const filteredBooks = myLibrary.filter(book => {
        if (filter === 'read') return book.read;
        if (filter === 'unread') return !book.read;
        return true;
    });

    filteredBooks.forEach((book, index) => {
        const bookCard = document.createElement('div');
        bookCard.classList.add('card');
        bookCard.innerHTML = `
            <div><span>Title:</span><h3>${book.title}</h3></div>
            <div><span>Author:</span><p>${book.author}</p></div>
            <div><span>Pages:</span><p>${book.pages}</p></div>
            <div><span>Status:</span><p>${book.read ? 'Read' : 'Not Read'}</p></div>
            <button class="toggle-read" data-index="${index}"><i class="fas ${book.read ? 'fa-eye' : 'fa-eye-slash'}"></i></button>
            <button class="remove-book" data-index="${index}"><i class="fas fa-trash"></i></button>
        `;
        libraryDiv.appendChild(bookCard);
    });

    document.querySelectorAll('.toggle-read').forEach(button => {
        button.addEventListener('click', function() {
            const index = this.getAttribute('data-index');
            myLibrary[index].read = !myLibrary[index].read;
            displayBooks(filter);
        });
    });

    document.querySelectorAll('.remove-book').forEach(button => {
        button.addEventListener('click', function() {
            const index = this.getAttribute('data-index');
            myLibrary.splice(index, 1);
            displayBooks(filter);
        });
    });
}

// Tab filtering
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        displayBooks(tab.getAttribute('data-tab'));
    });
});

// Form validation
const form = document.getElementById('bookForm');
const inputs = form.querySelectorAll('input:not([type="checkbox"])');

const validationMessages = {
    title: {
        valueMissing: 'Title is required',
        patternMismatch: 'Title must be at least 2 characters (letters/numbers)'
    },
    author: {
        valueMissing: 'Author is required',
        patternMismatch: 'Author must be at least 2 letters'
    },
    pages: {
        valueMissing: 'Pages are required',
        rangeUnderflow: 'Pages must be at least 1'
    }
};

function validateField(input) {
    const errorElement = document.getElementById(`${input.id}-error`);
    errorElement.style.display = 'none';

    if (!input.validity.valid) {
        const messages = validationMessages[input.id];
        let message = '';

        if (input.validity.valueMissing) message = messages.valueMissing;
        else if (input.validity.patternMismatch) message = messages.patternMismatch;
        else if (input.validity.rangeUnderflow) message = messages.rangeUnderflow;

        errorElement.textContent = message;
        errorElement.style.display = 'block';
        return false;
    }
    return true;
}

inputs.forEach(input => {
    input.addEventListener('input', function() {
        validateField(this);
    });
    input.addEventListener('blur', function() {
        validateField(this);
    });
});

form.addEventListener('submit', function(e) {
    e.preventDefault();
    let isValid = true;

    inputs.forEach(input => {
        if (!validateField(input)) isValid = false;
    });

    if (isValid) {
        addBookToLibrary(
            this.title.value,
            this.author.value,
            Number(this.pages.value),
            this.read.checked
        );
        this.reset();
        document.getElementById('modal').style.display = 'none';
    }
});

// Modal controls
document.getElementById('new-book-btn').addEventListener('click', () => {
    document.getElementById('modal').style.display = 'block';
});

document.querySelector('.cancelbtn').addEventListener('click', () => {
    form.reset();
    document.getElementById('modal').style.display = 'none';
});

window.onclick = function(event) {
    if (event.target == document.getElementById('modal')) {
        form.reset();
        document.getElementById('modal').style.display = 'none';
    }
};

// Initial setup
addBookToLibrary('The Great Gatsby', 'F. Scott Fitzgerald', 180, true);
addBookToLibrary('1984', 'George Orwell', 328, false);
addBookToLibrary('To Kill a Mockingbird', 'Harper Lee', 281, true);
addBookToLibrary('Moby Dick', 'Herman Melville', 635, false);
displayBooks();