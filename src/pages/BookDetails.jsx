import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookById } from "../features/books/booksSlice";

export default function BookDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const book = useSelector((state) => state.books.book);

  useEffect(() => {
    dispatch(fetchBookById(id));
  }, [id, dispatch]);

  return (
    <div className="container">
      <h3>Book Details</h3>
      {book && (
        <div className="card">
          <img
            src={book.image}
            className="card-img-top image-responsive"
            style={{ height: "300px", width: "300px", objectFit: "cover" }}
            alt={book.title}
          />
          <div className="card-body">
            <h5 className="card-title">{book.title}</h5>
            <p className="card-text">Description: {book.description}</p>
            <p className="card-text">Author: {book.author}</p>
            <p className="card-text">Price: ${book.price}</p>
            <Link to={`/books/${id}/edit`} className="btn btn-warning mx-2">
              Edit
            </Link>
            <Link to="/books" className="btn btn-primary">
              Back
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
