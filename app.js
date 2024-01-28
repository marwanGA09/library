console.log("hy");

// create book object
// const Book = {
//   names,
//   author,
//   page,
//   isRead,
// };

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
  listOfBook.forEach((e) => console.log(e));
}

function deleteListBook(index) {
  console.log(listOfBook.splice(index, 1));
}

createBook("poor dad", "robert", 134, "yes", 17);
createBook("Alchemy", "caylo", 124, "yes", 117);
createBook("atomic habit", "some one", 134, "no", 0);
createBook("The  miracle of", "ahmed", 334, "no", 0);

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
  console.log(read.value);
  console.log(bookMark.value);
  if (read.value == "no") {
    bookMark.value = 0;
  }

  if (bookMark.value > pageNo.value) {
    ev.stopPropagation();
    console.log("book mark must be less than page number");
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

function createCard(obj) {
  const bookDisplay = document.querySelector(".book-display");
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
  bookDisplay.append(card);
}

console.log(listOfBook[0]);
createCard(listOfBook[0]);
