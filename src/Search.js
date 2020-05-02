import React from "react";
import { Link } from "react-router-dom";
import { useBookSearchApi } from "./utils/useBookApi";
import Book from "./Book";

const Search = () => {
  const { books, search, setSearch, updateBook } = useBookSearchApi();

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link to="/">
          <button type="button" className="close-search">
            Close
          </button>
        </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title or author"
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {books.map((book) => (
            <li key={book.id}>
              <Book data={book} onChange={updateBook} />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default Search;
