// Object constructor
function Book(title, name, pages, isRead = false) {
  //TODO : set id for access book object
  (this.index = 0),
    (this.title = title),
    (this.name = name),
    (this.pages = Number.parseInt(pages)),
    (this.isRead = isRead);
}

function Library() {
  (this.books = []),
    (this.addBook = function (newBook) {
      this.books.push(newBook);
    });
  this.removeBook = function (index) {
    this.books.splice(index, 1);
  };
}

// Data
const book = new Book("Example Book", "lhj", 234);
const library = new Library();
library.addBook(book);

// function
function showOrCloseForm() {
  form.reset();
  form.classList.toggle("active");
}
function getBookFromForm() {
  const title = document.getElementById("title").value;
  const name = document.getElementById("name").value;
  const pages = document.getElementById("pages").value;
  const isRead = document.getElementById("isRead").checked;
  const newBook = new Book(title, name, pages, isRead);
  return newBook;
}

function refreshContent() {
  // refresh content
  let bookList = document.getElementById("bookList");
  if (bookList) {
    content.removeChild(bookList);
  }
  // add bookCard to div#bookList
  bookList = document.createElement("div");
  bookList.setAttribute("id", "bookList");
  const books = library.books;
  for (let index = 0; index < books.length; index++) {
    // bind array index to book object;
    books[index].index = index;
    const bookCard = createBookCard(
      books[index].title,
      books[index].isRead,
      index
    );
    bookList.appendChild(bookCard);
  }

  content.appendChild(bookList);

  listenReadBtnState();
  listenRemoveBtnState();
}

function createBookCard(title, isRead, index) {
  const h3 = document.createElement("h3");
  const newReadBtn = document.createElement("button");
  const newRemoveBtn = document.createElement("button");

  h3.textContent = title;
  newReadBtn.setAttribute("type", "button");
  newReadBtn.classList.add("readBtn");
  if (isRead) {
    newReadBtn.textContent = "Read";
    newReadBtn.classList.add("active");
  } else {
    newReadBtn.textContent = "Not read";
  }
  newRemoveBtn.classList.add("removeBtn");
  newRemoveBtn.textContent = "Remove";

  const div = document.createElement("div");
  div.setAttribute("id", index);
  div.appendChild(h3);
  div.appendChild(newReadBtn);
  div.appendChild(newRemoveBtn);
  return div;
}

function listenReadBtnState() {
  const readBtnList = document.querySelectorAll("button.readBtn");
  readBtnList.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      // get book index, and change the state
      const index = btn.parentElement.getAttribute("id");
      library.books[index].isRead = !library.books[index].isRead;
      //   refresh
      refreshContent();
    });
  });
}
function listenRemoveBtnState() {
  const removeBtnList = document.querySelectorAll("button.removeBtn");
  removeBtnList.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const index = btn.parentElement.getAttribute("id");
      const b = library.books[index];
      if (confirm(`Delete ${b.title}`)) {
        // delete specified book
        library.removeBook(index);
        // refresh
        refreshContent();
      }
    });
  });
}

// User interface
const form = document.querySelector("form");
const content = document.getElementById("content");
refreshContent();

//event listener
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const newBook = getBookFromForm();
  library.addBook(newBook);
  refreshContent();
  showOrCloseForm();
});
