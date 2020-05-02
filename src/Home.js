import React, { useState, useEffect, useCallback } from "react";
import * as BooksAPI from "./utils/BooksAPI";
import Book from "./Book";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [dataChanged, setDataChanged] = useState(false);

  useEffect(() => {
    const fetchData = async () =>
      BooksAPI.getAll().then((books) => setBooks(books));

    fetchData();
  }, [dataChanged]);

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
        {console.log(books)}
      </div>
      <Content books={books} />
      <div className="open-search">
        <button onClick={() => console.log("pressed")}>
          Add a book
        </button>
      </div>
    </div>
  );
};

const Content = ({ books }) => {
  const bookshelfBooks = useCallback(
    (bookshelf) => books.filter((book) => book.shelf === bookshelf),
    [books]
  );

  return (
    <div className="list-books-content">
      <div>
        <Bookshelf
          title="Currently Reading"
          books={bookshelfBooks("currentlyReading")}
        />
        <Bookshelf title="Want to Read" books={bookshelfBooks("wantToRead")} />
        <Bookshelf title="Read" books={bookshelfBooks("read")} />
      </div>
    </div>
  );
};

const Bookshelf = ({ title, books }) => (
  <div className="bookshelf">
    <h2 className="bookshelf-title">{title}</h2>
    <div className="bookshelf-books">
      <ol className="books-grid">
        {books.map((book) => (
          <li key={book.id}>
            <Book data={book} />
          </li>
        ))}
      </ol>
    </div>
  </div>
);

export default Home;
