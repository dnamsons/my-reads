import React from "react";
import { Link } from "react-router-dom";

const Search = () => (
  <div className="search-books">
    <div className="search-books-bar">
      <Link to="/">
        <button type="button" className="close-search">
          Close
        </button>
      </Link>
      <div className="search-books-input-wrapper">
        <input type="text" placeholder="Search by title or author" />
      </div>
    </div>
    <div className="search-books-results">
      <ol className="books-grid"></ol>
    </div>
  </div>
);

export default Search;