function regExpTest(regexp, data) {
  return regexp.test(data.value);
}

function createViews() {
  return {
    all: CreateBook.getBookList(),
    read: CreateBook.getBookList().filter((a) => a.isRead === "yes"),
    unread: CreateBook.getBookList().filter((a) => a.isRead === "no"),
  };
}

function sortBook() {
  return {
    author: function (listOfBook) {
      listOfBook.sort((a, b) => {
        if (a.author > b.author) {
          return 1;
        } else if (a.author < b.author) {
          return -1;
        } else {
          return 0;
        }
      });
    },
    book: function (listOfBook) {
      listOfBook.sort((a, b) => {
        if (a.name > b.name) {
          return 1;
        } else if (a.name < b.name) {
          return -1;
        } else {
          return 0;
        }
      });
    },
    page: function (listOfBook) {
      listOfBook.sort((a, b) => {
        return a.page - b.page;
      });
    },
    time: function (listOfBook) {
      listOfBook.sort((a, b) => {
        return a.number - b.number;
      });
    },
  };
}
let sortingObject = sortBook();
let currentSorting = "time";

class DomMain {
  constructor() {
    this.bookDisplay = document.querySelector(".book-display");
    this.addBook = document.querySelector(".add-book");
    this.modal = document.querySelector(".modal");
    this.cancelModal = document.querySelector(".cancel-modal");
    this.form = document.querySelector(".form");
    this.submitBtn = document.querySelector(".submit-btn");
    this.view = document.querySelector("#view");
    this.sorting = document.querySelector("#sort");
  }
}

class DomModal {
  constructor() {
    this.bookMark = document.querySelector("#bookmark");
    this.pageNo = document.querySelector("#page-no");
    this.read = document.querySelector("#read");
    this.bookName = document.querySelector("#b-name");
    this.author = document.querySelector("#author");
    this.errorName = document.querySelector("label[for='b-name'] .error");
    this.errorAuthor = document.querySelector("label[for='author'] .error");
    this.errorPage = document.querySelector("label[for='page-no'] .error");
    this.errorBookmark = document.querySelector("label[for='bookmark'] .error");
  }
}

const domMain = new DomMain();

class DisplayBooks {
  static displayListBook(listOfBook) {
    sortingObject[currentSorting](listOfBook);
    listOfBook.forEach((obj, ind) => createCard(obj, ind));
  }
}

class CreateBook {
  static #listOfBook = [];
  static totalBook = 0;
  constructor(name, author, page, isRead, mark) {
    CreateBook.totalBook += 1;
    this.number = CreateBook.totalBook;
    this.name = name;
    this.author = author;
    this.page = page;
    this.isRead = isRead;
    this.bookMark = mark;
    CreateBook.addToListOfBook(this);
  }

  static getBookList() {
    return CreateBook.#listOfBook;
  }

  static addToListOfBook(obj) {
    CreateBook.#listOfBook.push(obj);
  }

  // static displayListBook() {
  //   CreateBook.#listOfBook.forEach((obj, ind) => createCard(obj, ind));
  // }

  static deleteListBook(index) {
    CreateBook.#listOfBook.splice(index, 1);
  }
}

new CreateBook("JavaScript: The Good Parts", "Douglas Crockford", 176, "no", 0);
new CreateBook(
  "Harry Potter and the Philosopher's Stone",
  "J.K. Rowling",
  336,
  "yes",
  25
);
new CreateBook("The Catcher in the Rye", "J.D. Salinger", 224, "no", 0);
new CreateBook("To Kill a Mockingbird", "Harper Lee", 281, "yes", 22);
new CreateBook("1984", "George Orwell", 328, "yes", 20);
new CreateBook("The Great Gatsby", "F. Scott Fitzgerald", 180, "yes", 21);
new CreateBook("Pride and Prejudice", "Jane Austen", 279, "no", 19);
new CreateBook("The Hobbit", "J.R.R. Tolkien", 310, "yes", 24);
new CreateBook("The Alchemist", "Paulo Coelho", 208, "no", 16);

let currentView = "all";

let views = createViews();

DisplayBooks.displayListBook(views[currentView]);

domMain.addBook.addEventListener("click", () => {
  domMain.modal.showModal();
});

domMain.cancelModal.addEventListener("click", () => {
  domMain.modal.close();
});

domMain.submitBtn.addEventListener("click", (ev) => {
  const domModal = new DomModal();

  const text = /^[A-Za-z]+$/;
  const number = /^\d+$/;
  const redMessage = `0.2rem solid rgba(219, 60, 60, 0.6)`;
  const greenMessage = `0.2rem solid #339933`;
  if (domModal.read.value == "no") {
    domModal.bookMark.value = 0;
  }

  if (!regExpTest(text, domModal.bookName)) {
    domModal.errorName.textContent = "Book name should be character";
    domModal.bookName.style.border = redMessage;
  } else {
    domModal.bookName.style.border = greenMessage;
    domModal.errorName.textContent = "";
  }

  if (!regExpTest(text, domModal.author)) {
    domModal.errorAuthor.textContent = "Author name should be character";
    domModal.author.style.border = redMessage;
  } else {
    domModal.author.style.border = greenMessage;
    domModal.errorAuthor.textContent = "";
  }

  if (!regExpTest(number, domModal.bookMark)) {
    domModal.errorBookmark.textContent = "Bookmark should be number";
    domModal.bookMark.style.border = redMessage;
  } else {
    domModal.errorBookmark.textContent = "";
    domModal.bookMark.style.border = greenMessage;
  }

  if (!regExpTest(number, domModal.pageNo)) {
    domModal.errorPage.textContent = "Page should be number";
    domModal.pageNo.style.border = redMessage;
  } else {
    domModal.errorPage.textContent = "";
    domModal.pageNo.style.border = greenMessage;
  }

  if (
    domModal.bookMark.value > domModal.pageNo.value &&
    regExpTest(number, domModal.bookMark) &&
    domModal.bookMark === 0
  ) {
    domModal.errorBookmark.textContent =
      "Bookmark must be less than page number";
    domModal.bookMark.style.border = redMessage;
  } else if (
    domModal.bookMark.value <= domModal.pageNo.value &&
    regExpTest(number, domModal.bookMark)
  ) {
    domModal.errorBookmark.textContent = "";
    domModal.bookMark.style.border = greenMessage;
  }

  if (
    !(
      regExpTest(text, domModal.bookName) && regExpTest(text, domModal.author)
    ) ||
    domModal.bookMark.value > domModal.pageNo.value ||
    !(
      regExpTest(number, domModal.bookMark) &&
      regExpTest(number, domModal.pageNo)
    )
  ) {
    ev.preventDefault();
  } else {
    const data = new FormData(domMain.form); // create array of object
    // console.log(data);
    // let create object from submit data of form
    // let obj = Object.create(Book);
    // console.log(obj);
    // obj = Object.fromEntries(data);
    const values = Object.values(Object.fromEntries(data));
    new CreateBook(...values);
    views = createViews();
    removeAllChild();
    DisplayBooks.displayListBook(views[currentView]);

    // clear up the input
    const input = document.querySelectorAll('input[type="text"]');
    input.forEach((inp) => {
      // console.log(inp);
      inp.value = "";
    });
    domModal.pageNo.value = "";
    domMain.modal.close();
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
    obj.isRead == "yes" ? "✅" : "❌"
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

  domMain.bookDisplay.append(card);
}

function removeAllChild() {
  const div = document.querySelectorAll(".book-display .card");
  div.forEach((el) => {
    domMain.bookDisplay.removeChild(el);
  });
}

// delete cards when delete button is clicked

domMain.bookDisplay.addEventListener("click", (ev) => {
  if (ev.target.dataset.index != undefined && domMain.view.value === "all") {
    // console.log(ev.target.dataset.index);
    CreateBook.deleteListBook(ev.target.dataset.index);
    views = createViews();
    removeAllChild();
    DisplayBooks.displayListBook(views[currentView]);
  }
});

// const arr = CreateBook.getBookList();
// const newArray = arr;

// console.log(arr);

domMain.view.addEventListener("change", (ev) => {
  currentView = ev.target.value;
  removeAllChild();
  DisplayBooks.displayListBook(views[currentView]);
});

// const sor = ;

domMain.sorting.addEventListener("change", (ev) => {
  currentSorting = ev.target.value;
  removeAllChild();
  DisplayBooks.displayListBook(views[currentView]);
});
