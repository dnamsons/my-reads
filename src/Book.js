import React from "react";

const BookShelfDropdown = ({ data, onChange }) => (
  <div className="book-shelf-changer">
    <select
      value={data.shelf || "none"}
      onChange={(e) => onChange(data, e.target.value)}
    >
      <option value="move" disabled>
        Move to...
      </option>
      <option value="currentlyReading">Currently Reading</option>
      <option value="wantToRead">Want to Read</option>
      <option value="read">Read</option>
      <option value="none">None</option>
    </select>
  </div>
);

const BookTop = ({ data, onChange }) => {
  const backgroundProperty = data?.imageLinks
    ? { backgroundImage: `url("${data.imageLinks.thumbnail}")` }
    : {};

  return (
    <div className="book-top">
      <div
        className="book-cover"
        style={{
          width: 128,
          height: 193,
          ...backgroundProperty,
        }}
      />
      <BookShelfDropdown data={data} onChange={onChange} />
    </div>
  );
};

const Book = ({ data, onChange }) => (
  <div className="book">
    <BookTop data={data} onChange={onChange} />
    <div className="book-title">{data.title}</div>
    <div className="book-authors">
      {data.authors &&
        data.authors.map((author, i) => (
          <p key={`${data.id}-author-${i}`}>{author}</p>
        ))}
    </div>
  </div>
);

export default Book;
