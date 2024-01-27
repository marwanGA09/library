console.log("hy");

// create book object
// const Book = {
//   names,
//   author,
//   page,
//   isRead,
// };

function Book(name, author, page, isRead) {
  this.name = name;
  this.author = author;
  this.page = page;
  this.isRead = isRead;
}

const listOfBook = [];

function createBook(n, a, p, i) {
  let book = new Book(n, a, p, i);
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
// displayListBook();
