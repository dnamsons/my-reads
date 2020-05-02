import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import { useBookApi } from "./utils/useBookApi";
import Book from "./Book";

const Home = () => (
  <div className="list-books">
    <div className="list-books-title">
      <h1>MyReads</h1>
    </div>
    <Content />
    <div className="open-search">
      <Link to="/search">
        <button type="button">Add a book</button>
      </Link>
    </div>
  </div>
);

const BOOKSHELVES = {
  currentlyReading: "Currently Reading",
  wantToRead: "Want to Read",
  read: "Read",
};

const Content = () => {
  const { books, updateBook } = useBookApi();

  const bookshelfBooks = useCallback(
    (bookshelf) => books.filter((book) => book.shelf === bookshelf),
    [books]
  );

  return (
    <div className="list-books-content">
      <div>
        {Object.keys(BOOKSHELVES).map((bookshelf) => (
          <Bookshelf
            key={bookshelf}
            title={BOOKSHELVES[bookshelf]}
            books={bookshelfBooks(bookshelf)}
            onChange={updateBook}
          />
        ))}
      </div>
    </div>
  );
};

const Bookshelf = ({ title, books, onChange }) => (
  <div className="bookshelf">
    <h2 className="bookshelf-title">{title}</h2>
    <div className="bookshelf-books">
      <ol className="books-grid">
        {books.map((book) => (
          <li key={book.id}>
            <Book data={book} onChange={onChange} />
          </li>
        ))}
      </ol>
    </div>
  </div>
);

export default Home;
