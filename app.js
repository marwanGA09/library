console.log("hy");

// create book object
// const Book = {
//   names,
//   author,
//   page,
//   isRead,
// };

const bookDisplay = document.querySelector(".book-display");
function Book(name, author, page, isRead, mark) {
  this.name = name;
  this.author = author;
  this.page = page;
  this.isRead = isRead;
  this.bookMark = mark;
}

// Book.prototype.pages = function () {
//   console.log(this.page);
// };

const listOfBook = [];

function createBook(n, a, p, r, m) {
  let book = new Book(n, a, p, r, m);
  listOfBook.push(book);
}

function displayListBook() {
  listOfBook.forEach((obj, ind) => createCard(obj, ind));
}

function deleteListBook(index) {
  console.log(listOfBook.splice(index, 1));
}

createBook("poor dad", "robert", 134, "yes", 17);
createBook("Alchemy", "caylo", 124, "yes", 117);
createBook("atomic habit", "some one", 134, "no", 0);
createBook("The  miracle of", "ahmed", 334, "no", 0);
displayListBook();

// listOfBook[1].pages();
// displayListBook();

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
  //   let bookName = document.querySelector("#b-name");

  const text = /[A-Za-z]+/;

  if (read.value == "no") {
    bookMark.value = 0;
  }
  if (
    !(text.test(bookName.value) && text.test(author.value)) ||
    bookMark.value > pageNo.value
  ) {
    ev.preventDefault();
    console.log("patter does not match");
    //   }

    //   if (bookMark.value > pageNo.value) {
    //     ev.stopPropagation();
    //     console.log("book mark must be less than page number");
  }
  //   else if () {

  //   }
  else {
    const data = new FormData(form); // create array of object

    // let create object from submit data of form
    let obj = Object.create(Book);
    console.log(obj);
    obj = Object.fromEntries(data);
    const values = Object.values(obj);
    createBook(...values);

    removeAllChild();
    displayListBook();
  }

  //   const input = document.querySelectorAll('input[type="text"]');
  //   input.forEach((inp) => {
  //     console.log(inp);
  // //   });
  //   modal.close();
  //   console.log(ev.returnValue);

  // take data from user input
});

// function Book(name, author, page, isRead, mark) {
//   this.name = name;
//   this.author = author;
//   this.page = page;
//   this.isRead = isRead;
//   this.bookMark = mark;
// }

function createCard(obj, ind) {
  const card = document.createElement("div");
  card.classList.add("card");
  //   card.dataset.index = ind;

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
    listOfBook.splice(ev.target.dataset.index, 1);
    removeAllChild();
    displayListBook();
  }
});
