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

  const updateBook = async (book, bookshelf) => {
    await BooksAPI.update(book, bookshelf);

    setBooks(
      books.map((b) =>
        b.id === book.id ? { ...book, shelf: bookshelf } : { ...b }
      )
    );
  };

  useEffect(() => {
    let ignore = false;

    const fetchData = async () => {
      const foundBooks = await BooksAPI.search(search).then((books) =>
        Array.isArray(books)
          ? Promise.all(books.map((book) => BooksAPI.get(book.id)))
          : []
      );

      if (!ignore) setBooks(foundBooks);
    };

    search.length !== 0 && fetchData();
    return () => {
      ignore = true;
    };
  }, [search]);

  return { books, search, setSearch, updateBook };
};
