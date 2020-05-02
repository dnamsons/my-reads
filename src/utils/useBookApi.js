import { useCallback, useEffect, useState } from "react";
import * as BooksAPI from "./BooksAPI";

const useBookApi = () => {
  const [books, setBooks] = useState([]);
  const [dataChanged, setDataChanged] = useState(false);

  const updateBook = useCallback(
    (book, bookshelf) => {
      BooksAPI.update(book, bookshelf);
      setDataChanged(true);
    },
    [books]
  );

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

export default useBookApi;
