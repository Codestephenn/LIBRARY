// Initialize an array to hold the library books
const myLibrary = [];

/**
 * Book Constructor
 * @param {string} title - The title of the book
 * @param {string} author - The author of the book
 * @param {number} pages - The number of pages in the book
 * @param {boolean} read - Whether the book has been read or not
 */
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

/**
 * Add a new book to the library
 * @param {string} title - The title of the book
 * @param {string} author - The author of the book
 * @param {number} pages - The number of pages in the book
 * @param {boolean} read - Whether the book has been read or not
 */
function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  displayBooks();
}

/**
 * Display books in the library
 * @param {string} filter - The filter to apply (all, read, unread)
 */
function displayBooks(filter = 'all') {
  const libraryDiv = document.querySelector('#library');
  libraryDiv.innerHTML = '';

  // Filter books based on the selected filter
  const filteredBooks = myLibrary.filter(book => {
    if (filter === 'read') return book.read;
    if (filter === 'unread') return !book.read;
    return true;
  });

  // Create and append book cards
  filteredBooks.forEach((book, index) => {
    const bookCard = document.createElement('div');
    bookCard.classList.add('card');
    bookCard.innerHTML = `
      <div>
      <span>Book Title: </span>
        <h3>${book.title}</h3>
      </div>
      <div>
      <span>Author:</span>
        <p>${book.author}</p>
      </div>
      <div>
        <p><span>Pages: </span>${book.pages}</p>
      </div>
      <div>
        <p><span>Status:</span> ${book.read ? 'Read' : 'Not Read'}</p>
      </div>
      <button class="toggle-read" data-index="${index}"><i class="fas ${book.read ? 'fa-eye' : 'fa-eye-slash'}"></i></button>
      <button class="remove-book" data-index="${index}"><i class="fas fa-trash"></i></button>
    `;
    libraryDiv.appendChild(bookCard);
  });

  // Add event listeners for toggle read and remove buttons
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

// Event listeners for tabs to filter books
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    displayBooks(tab.getAttribute('data-tab'));
  });
});

// Add sample books to the library for initial display
addBookToLibrary('The Great Gatsby', 'F. Scott Fitzgerald', 180, true);
addBookToLibrary('1984', 'George Orwell', 328, false);
addBookToLibrary('To Kill a Mockingbird', 'Harper Lee', 281, true);
addBookToLibrary('Moby Dick', 'Herman Melville', 635, false);

// Initial display of all books
displayBooks();

// Handle form submission to add a new book
document.getElementById('bookForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const title = this.title.value;
  const author = this.author.value;
  const pages = this.pages.value;
  const read = this.read.checked;
  addBookToLibrary(title, author, pages, read);
  document.getElementById('modal').style.display = 'none';
  this.reset();
});

// Close modal when clicking outside of it
window.onclick = function(event) {
  const modal = document.getElementById('modal');
  if (event.target == modal) {
    modal.style.display = 'none';
  }
}