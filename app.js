const bookDisplay = document.querySelector(".book-display");
// function Book(name, author, page, isRead, mark) {
//   this.name = name;
//   this.author = author;
//   this.page = page;
//   this.isRead = isRead;
//   this.bookMark = mark;
// }

// const listOfBook = [];

// function createBook(n, a, p, r, m) {
//   let book = new Book(n, a, p, r, m);
//   listOfBook.push(book);
// }

// function displayListBook() {
//   listOfBook.forEach((obj, ind) => createCard(obj, ind));
// }

// function deleteListBook(index) {
//   listOfBook.splice(index, 1);
// }

class CreateBook {
  static #listOfBook = [];

  constructor(name, author, page, isRead, mark) {
    this.name = name;
    this.author = author;
    this.page = page;
    this.isRead = isRead;
    this.bookMark = mark;
    CreateBook.addToListOfBook(this);
  }

  static addToListOfBook(obj) {
    CreateBook.#listOfBook.push(obj);
  }

  static displayListBook() {
    CreateBook.#listOfBook.forEach((obj, ind) => createCard(obj, ind));
  }

  static deleteListBook(index) {
    CreateBook.#listOfBook.splice(index, 1);
  }
}

new CreateBook("poor dad", "robert", 134, "yes", 17);
new CreateBook("Alchemy", "caylo", 124, "yes", 117);
new CreateBook("atomic habit", "some one", 134, "no", 0);
new CreateBook("poor dad", "robert", 134, "yes", 17);
new CreateBook("Alchemy", "caylo", 124, "yes", 117);
new CreateBook("atomic habit", "some one", 134, "no", 0);
new CreateBook("Alchemy", "caylo", 124, "yes", 117);
new CreateBook("atomic habit", "some one", 134, "no", 0);
CreateBook.displayListBook();

const addBook = document.querySelector(".add-book");
const modal = document.querySelector(".modal");
const cancelModal = document.querySelector(".cancel-modal");
const form = document.querySelector(".form");

addBook.addEventListener("click", (ev) => {
  modal.showModal();
});

cancelModal.addEventListener("click", (ev) => {
  modal.close();
});

const submitBtn = document.querySelector(".submit-btn");
submitBtn.addEventListener("click", (ev) => {
  const bookMark = document.querySelector("#bookmark");
  const pageNo = document.querySelector("#page-no");
  const read = document.querySelector("#read");
  let bookName = document.querySelector("#b-name");
  let author = document.querySelector("#author");

  const text = /^[A-Za-z]+$/;
  const number = /^\d+$/;
  if (read.value == "no") {
    bookMark.value = 0;
  }

  const errorName = document.querySelector("label[for='b-name'] .error");
  const errorAuthor = document.querySelector("label[for='author'] .error");
  const errorPage = document.querySelector("label[for='page-no'] .error");
  const errorBookmark = document.querySelector("label[for='bookmark'] .error");

  if (!text.test(bookName.value)) {
    errorName.textContent = "Book name should be character";
    bookName.style.border = `0.2rem solid rgba(219, 60, 60, 0.6)`;
  } else {
    bookName.style.border = `0.2rem solid #339933`;
    errorName.textContent = "";
  }

  if (!text.test(author.value)) {
    errorAuthor.textContent = "Author name should be character";
    author.style.border = `0.2rem solid rgba(219, 60, 60, 0.6)`;
  } else {
    author.style.border = `0.2rem solid #339933`;
    errorAuthor.textContent = "";
  }

  if (!number.test(bookMark.value)) {
    errorBookmark.textContent = "Bookmark should be number";
    bookMark.style.border = `0.2rem solid rgba(219, 60, 60, 0.6)`;
  } else {
    errorBookmark.textContent = "";
    bookMark.style.border = `0.2rem solid #339933`;
  }

  if (!number.test(pageNo.value)) {
    errorPage.textContent = "Page should be number";
    pageNo.style.border = `0.2rem solid rgba(219, 60, 60, 0.6)`;
  } else {
    errorPage.textContent = "";
    pageNo.style.border = `0.2rem solid #339933`;
  }

  if (
    bookMark.value > pageNo.value &&
    number.test(bookMark.value) &&
    bookMark === 0
  ) {
    errorBookmark.textContent = "Bookmark must be less than page number";
    bookMark.style.border = `0.2rem solid rgba(219, 60, 60, 0.6)`;
  } else if (bookMark.value <= pageNo.value && number.test(bookMark.value)) {
    errorBookmark.textContent = "";
    bookMark.style.border = `0.2rem solid #339933`;
  }

  if (
    !(text.test(bookName.value) && text.test(author.value)) ||
    bookMark.value > pageNo.value ||
    !(number.test(bookMark.value) && number.test(pageNo.value))
  ) {
    ev.preventDefault();
  } else {
    // console.log(form)
    const data = new FormData(form); // create array of object
    // console.log(data);
    // let create object from submit data of form
    // let obj = Object.create(Book);
    // console.log(obj);
    // obj = Object.fromEntries(data);
    const values = Object.values(Object.fromEntries(data));
    new CreateBook(...values);

    removeAllChild();
    CreateBook.displayListBook();

    // clear up the input
    const input = document.querySelectorAll('input[type="text"]');
    input.forEach((inp) => {
      // console.log(inp);
      inp.value = "";
    });
    pageNo.value = "";
    modal.close();
  }
});

function createCard(obj, ind) {
  const card = document.createElement("div");
  card.classList.add("card");

  const bookName = document.createElement("p");
  bookName.innerHTML = `Book Name: <span>${obj.name}</span>`;
  bookName.classList.add("card__book-name");
  card.append(bookName);

  const author = document.createElement("p");
  author.innerHTML = `Author: <span>${obj.author}</span>`;
  author.classList.add("card__author");
  card.append(author);

  const page = document.createElement("p");
  page.innerHTML = `page Number: <span>${obj.page}</span>`;
  page.classList.add("card__page");
  card.append(page);

  const div = document.createElement("div");
  const read = document.createElement("p");
  read.innerHTML = `Have you read?: <span>${
    obj.isRead == "yes" ? "👍" : "👎"
  }</span>`;
  read.classList.add("card__read");
  div.append(read);

  const bookmark = document.createElement("p");
  bookmark.innerHTML = `bookmark: <span>${obj.bookMark}</span>`;
  bookmark.classList.add("card__bookmark");
  div.append(bookmark);
  card.append(div);

  const deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = `Remove`;
  deleteBtn.classList.add("delete-btn");
  deleteBtn.dataset.index = ind;
  card.append(deleteBtn);

  bookDisplay.append(card);
}

function removeAllChild() {
  const div = document.querySelectorAll(".book-display .card");
  div.forEach((el) => {
    bookDisplay.removeChild(el);
  });
}

// delete cards when delete button is clicked

bookDisplay.addEventListener("click", (ev) => {
  if (ev.target.dataset.index != undefined) {
    CreateBook.deleteListBook(ev.target.dataset.index);
    removeAllChild();
    CreateBook.displayListBook();
  }
});
