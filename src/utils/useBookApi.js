import { useEffect, useState } from "react";
import * as BooksAPI from "./BooksAPI";

export const useBookApi = () => {
  const [books, setBooks] = useState([]);
  const [dataChanged, setDataChanged] = useState(false);

  const updateBook = (book, bookshelf) => {
    BooksAPI.update(book, bookshelf);
    setDataChanged(true);
  };

  useEffect(() => {
    const fetchData = async () =>
      BooksAPI.getAll().then((books) => setBooks(books));

    if (dataChanged) {
      setDataChanged(false);
    }

    fetchData();
  }, [dataChanged]);

  return { books, updateBook };
};

export const useBookSearchApi = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");

  const updateBook = (book, bookshelf) => BooksAPI.update(book, bookshelf);

  useEffect(() => {
    let ignore = false;

    const fetchData = async () => {
      const books = await BooksAPI.search(search);
      if (!ignore) setBooks(books);
    };

    search.length !== 0 && fetchData();
    return () => {
      ignore = true;
    };
  }, [search]);

  return { books, search, setSearch, updateBook };
};
