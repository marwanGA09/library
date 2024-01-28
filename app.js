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

Book.prototype.pages = function () {
  console.log(this.page);
};
console.log(Book.prototype);

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

// createBook("asa", "bb", 34, true);
// createBook("ddd", "bb", 34, true);
// createBook("qqq", "bb", 34, true);
// createBook("vvv", "bb", 34, true);
// displayListBook();
// deleteListBook(1);

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
  //   const input = document.querySelectorAll('input[type="text"]');
  //   input.forEach((inp) => {
  //     console.log(inp);
  // //   });
  //   modal.close();
  //   console.log(ev.returnValue);

  // take data from user input

  const data = new FormData(form); // create array of object

  // let create object from submit data of form
  let obj = Object.create(Book);
  console.log(obj);
  obj = Object.fromEntries(data);
  const values = Object.values(obj);
  createBook(...values);

  displayListBook();
});
