import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";
import { fetchBooks, deleteBook } from "../features/books/booksSlice";
import { searchBooks } from "../api/bookApi";
import SearchBox from "./SearchBox";
import "../books.css";

export default function Books() {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books.books);
  const status = useSelector((state) => state.books.status);
  const error = useSelector((state) => state.books.error);

  const [showModal, setShowModal] = useState(false);
  const [removeIndex, setRemoveIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchBooks());
    }
  }, [status, dispatch]);

  useEffect(() => {
    setFilteredBooks(books);
  }, [books]);

  const handleDelete = (bookId) => {
    dispatch(deleteBook(bookId));
    handleClose();
  };

  const handleClose = () => {
    setRemoveIndex(null);
    setShowModal(false);
  };

  const handleRemoveClick = (index, event) => {
    event.stopPropagation();
    setRemoveIndex(index);
    setShowModal(true);
  };

  const handleSearch = async (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    console.log(query);

    if (query.length > 0) {
      try {
        const response = await searchBooks(query);
        setFilteredBooks(response.data);
        console.log(filteredBooks);
      } catch (error) {
        console.error("Failed to search books", error);
        setFilteredBooks([]);
      }
    } else {
      setFilteredBooks(books);
    }
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mt-5">
      <h3 className="my-3 border-bottom">Books</h3>
      <div className="d-flex justify-content-between mb-3">
        <Link to="/books/0/edit">
          <Button variant="primary">Add Book</Button>
        </Link>
        <SearchBox searchQuery={searchQuery} handleSearch={handleSearch} />
      </div>
      <div className="d-flex flex-wrap justify-content-center">
        {filteredBooks.map((book, index) => (
          <div key={book.id} className="card border-0 shadow-sm custom-card m-3">
            <img src="images/book.jpg" className="card-img-top" alt="Book cover" />
            <div className="card-body">
              <Link to={`/books/${book.id}`} className="text-decoration-none">
                <h5 className="card-title">{book.title}</h5>
              </Link>
              <div className="badge text-dark bg-primary-subtle category">
                {book.cat}
              </div>
              <div className="text-end lead">${book.price}</div>
              <p className="text-black-50">{book.description}</p>
              {book.isAvailable && (
                <div className="badge available bg-success text-white border-0">
                  Available
                </div>
              )}
            </div>
            <button
              className="card-footer bg-danger text-white border-0"
              onClick={(event) => handleRemoveClick(index, event)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Removal</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to remove this book?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() => handleDelete(books[removeIndex]?.id)}
          >
            Remove
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
